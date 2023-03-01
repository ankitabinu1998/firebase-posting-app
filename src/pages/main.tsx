import {collection, getDocs} from 'firebase/firestore';
import {db} from '../config/firebase';
import {useState,useEffect} from 'react';
import {Post} from './create-post/post'
import './create-post/post.css'
import {Error} from './error'

interface PostInt {
    title: "string",
    description:"string",
    id:"string",
    userName:"string",
    userId:"string"
}

export const Main = () => {
    const [postsList,setPostsList] = useState<PostInt[] | null>(null);

    const getPosts = async() => {
        const data= await getDocs(collection(db, "posts"));
        setPostsList(data.docs.map((post) =>
            ({...post.data(),id: post.id})) as PostInt[]);
    };

    useEffect(()=>{getPosts()},[]);

    return (
        <>
         <h1>Home Page</h1>
         <div className='post-list'>
            {postsList?.map((post:any)=>{
            return <Post post={post}/>
         })}
         </div>
         {!postsList && <Error msg='Something went wrong !'/>}
        </>

    )
}