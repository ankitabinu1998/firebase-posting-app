import {addDoc, collection, query, getDocs, where, deleteDoc, doc} from 'firebase/firestore'
import {auth, db,} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from 'react';

interface LikeDataSentToButton {
    likeData:
        {
            userWhoLikedId: string,
            postId: string
        },
    likeDocId: string
}

interface Like {
    userWhoLikedId: string,
    likeDocId: string
}

export const Post = (props:any) => {
    const [user] = useAuthState(auth);
    const [like, setLike] = useState<Like[] | []>([]);
    const likesRef = collection(db,"likes");
    const userLikedAlready = like.find((element)=>element.userWhoLikedId === user?.uid);

    const onLikePost = async (data:LikeDataSentToButton) => {
        if (!userLikedAlready ) {
            try{
                const docRef =await addDoc(likesRef,{
                    ...data.likeData
                });
                setLike((prev)=>[...prev,{userWhoLikedId:data.likeData.userWhoLikedId,likeDocId:docRef.id}])
            } catch(e) {
                console.log(e);
            }
        } else if (userLikedAlready) {
            try {
                const deleteDocRef = doc(db,"likes",userLikedAlready.likeDocId);
                await deleteDoc(deleteDocRef);
                setLike(like.filter(element => element.likeDocId !== userLikedAlready.likeDocId));
            } catch (e) {
                console.log(e);
            }
        }
    }

    const getLikes = async () => {
        const q = query(collection(db,"likes"), where("postId","==",props.post.id));
        const LikeData= await (getDocs(q));
        setLike(LikeData.docs.map((doc) => {
            return {userWhoLikedId: doc.data().userWhoLikedId,
                    likeDocId: doc.id};
        }));
    }

    useEffect(()=>{
        getLikes();
    },[])

    return (
        <div key={props.post.id} className="post-body">
            <h3 className="post-title">{props.post.title}</h3>
            <hr/>
            <p className="post-description">{props.post.description}</p>
            <p className="post-user-name">- {props.post.userName}</p>
            {user && <div className='like-btn-container'>
                <button className={!userLikedAlready ? "like-btn" : "unlike-btn"} disabled={user.uid === props.post.userId} onClick={()=>
                    onLikePost(
                        {
                            likeData:{userWhoLikedId: user?.uid,
                            postId:props.post.id},
                            likeDocId:props.post.id
                        }
                        )}>
                    {userLikedAlready ? <>👎</> : <>👍</>}
                </button>
                <p>{like.length <= 1 ? `${like.length} Like` : `${like.length} Likes`}</p>
                </div>}
        </div>
    )
}