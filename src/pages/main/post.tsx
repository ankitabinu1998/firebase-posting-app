import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";

interface LikeInt {
    userWhoLikedId: string,
    postId: string
}

export const Post = (props:any) => {
    const [user] = useAuthState(auth);
    const likesRef = collection(db,"likes");
    const onLikePost = async (data:LikeInt) => {
        await addDoc(likesRef,{
            ...data
        });
    }


    return (
        <div key={props.post.id} className="post-body">
            <h3 className="post-title">{props.post.title}</h3>
            <hr/>
            <p className="post-description">{props.post.description}</p>
            <p className="post-user-name">- {props.post.userName}</p>
            {user && <button className="like-btn" disabled={user.uid !== props.post.userId} onClick={()=>
                onLikePost(
                    {
                        userWhoLikedId: user?.uid,
                        postId:props.post.id
                    }
                    )}>
                &#128077;
            </button>}
            <p>{props.post.count}</p>
        </div>
    )
}