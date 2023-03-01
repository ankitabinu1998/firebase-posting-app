import {collection, getDocs} from 'firebase/firestore';
import {db} from '../config/firebase';
import {useState,useEffect} from 'react';
import {Post} from './create-post/post'
// import {useAuthState} from 'react-firebase-hooks/auth';
interface PostInt {
    title: "string",
    description:"string",
    id:"string",
    userName:"string",
    userId:"string"
}

export const Main = () => {
    // const [user] = useAuthState(auth);
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
         {postsList?.map((post:any)=>{
            return <Post post={post}/>
         })}
         {!postsList && <h3>Please sign in</h3>}
        </>

    )
}