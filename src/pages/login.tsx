
import {auth, provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        await signInWithPopup(auth,provider);
        navigate('/');
    }
    return (
        <div>
            <h2>Sign in With Google to Continue</h2>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}