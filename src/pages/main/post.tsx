import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from 'react';

interface LikeInt {
    data: {
        userWhoLikedId: string,
        postId: string
    },
    count: "number"
}

export const Post = (props:any) => {
    const [user] = useAuthState(auth);
    let [likesCount, setLikesCount] = useState(props.post.count);
    const likesRef = collection(db,"likes");
    const onLikePost = async (data:LikeInt) => {
        await addDoc(likesRef,{
            ...data.data
        });
        let count = likesCount + 1;
        setLikesCount(count);
    }

    useEffect(()=>{},[likesCount])

    return (
        <div key={props.post.id} className="post-body">
            <h3 className="post-title">{props.post.title}</h3>
            <hr/>
            <p className="post-description">{props.post.description}</p>
            <p className="post-user-name">- {props.post.userName}</p>
            {user && <div className='like-btn-container'>
                <button className="like-btn" disabled={user.uid === props.post.userId} onClick={()=>
                    onLikePost(
                        {
                            data: {
                                userWhoLikedId: user?.uid,
                                postId:props.post.id},
                            count: props.post.count
                        }
                        )}>
                    &#128077;
                </button>
                <p>{likesCount <= 1 ? `${likesCount} Like` : `${likesCount} Likes`}</p>
                </div>}
        </div>
    )
}