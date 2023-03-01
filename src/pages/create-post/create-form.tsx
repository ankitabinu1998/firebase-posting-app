import {useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import './create-form.css'
import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import {useState} from 'react';


interface CreateFormData {
    title: string,
    description: string,
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const [postSubmitted, setPostSubmitted] = useState(false);
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description")
    });
    const {register,handleSubmit, formState:{errors}, reset} = useForm<CreateFormData> ({
        resolver:yupResolver(schema),
    });
    const postsRef = collection(db,"posts");
    const onCreatePost = async (data:CreateFormData) => {
         const result = await addDoc(postsRef,{
            ...data, // use everthing from data
            // title: data.title,
            // description: data.description,
            userName: user?.displayName,
            userId: user?.uid,
        });
        if (result.id){
            setPostSubmitted(true);
            reset();
            window.setTimeout(()=>{
                setPostSubmitted(false);
            },3000);
        }
    }

    return(
        <form onSubmit={handleSubmit(onCreatePost)}>
            {postSubmitted &&
            <>
                <button className="closebtn" onClick={() => setPostSubmitted(false)}>x</button>
                <p className="success-msg-text">Form has been submitted successfully !</p>
            </>}
            <h1>Enter Post</h1>
            <div className="create-form-child">
                <label>Title</label>
                <input placeholder="Title..." {...register("title")}></input>
            </div>
            <p className="error-msg">{errors.title?.message}</p>
            <div className="create-form-child">
                <label>Description</label>
                <textarea placeholder="Description..." {...register("description")}></textarea>
            </div>
            <p className="error-msg">{errors.description?.message}</p>
            <input className="create-form-submit-btn" type="submit"></input>
        </form>
    )
}