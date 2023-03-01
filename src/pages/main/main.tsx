import {collection, getDocs, query, where} from 'firebase/firestore';
import {db , auth} from '../../config/firebase';
import {useState,useEffect} from 'react';
import {Post} from './post'
import './post.css'
import {Error} from '../error'
import { useAuthState } from "react-firebase-hooks/auth";

interface PostInt {
    title: "string",
    description:"string",
    id:"string",
    userName:"string",
    userId:"string",
    count:"number"
}


export const Main = () => {
    const [user] = useAuthState(auth);
    const [postsList,setPostsList] = useState<PostInt[] | null>(null);

    const getPosts = async() => {
        const data= await getDocs(collection(db, "posts"));
        let obj = {};
        let postsArr = await Promise.all(data.docs.map(async (post)=>{
            let count = await getLikes(post.id);
            obj = {...post.data(), id: post.id, count: count} as unknown as PostInt;
            return obj;
        }));
        setPostsList(postsArr as PostInt[]);
    };


    const getLikes = async(postId:string) => {
        const q = query(collection(db,"likes"), where("postId","==",postId));
        const LikeData= await getDocs(q);
        return LikeData.size;
    };

    useEffect(()=>{getPosts()},[]);

    return (
        <>
         <h1>Home Page</h1>
         {!user && <h4>Log in to see likes</h4>}
         <div className='post-list'>
            {postsList?.map((post:any)=>{
            return <Post post={post}/>
         })}
         </div>
         {!postsList && <Error msg='Something went wrong !'/>}
        </>
    )
}