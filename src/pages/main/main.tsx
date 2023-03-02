import {collection, getDocs} from 'firebase/firestore';
import {db , auth} from '../../config/firebase';
import {useState,useEffect} from 'react';
import {Post} from './post'
import './post.css'
import { useAuthState } from "react-firebase-hooks/auth";

interface PostInt {
    title: "string",
    description:"string",
    id:"string",
    userName:"string",
    userId:"string",
}


export const Main = () => {
    const [user] = useAuthState(auth);
    const [postsList,setPostsList] = useState<PostInt[] | null>(null);

    const getPosts = async() => {
        const data= await getDocs(collection(db, "posts"));
        let obj = {};
        let postsArr = data.docs.map( (post)=>{
            obj = {...post.data(), id: post.id}  as PostInt;
            return obj;
        });
        setPostsList(postsArr as PostInt[]);
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
        </>
    )
}