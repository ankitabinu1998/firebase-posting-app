import {Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import './navbar.css'
import { signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';


export const NavBar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const signUserOut = async() => {
        await signOut(auth);
        navigate('/');
    }
    return (
        <div className='nav-bar'>
            <div className='nav-item'>
                <Link to='/'>Home</Link>
                {user ? <Link to='/createpost'>Create Post</Link> : <Link to='/login'>Login</Link> }
            </div>
            <div className='nav-item'>
                {user &&
                <>
                    <p>{user?.displayName}</p>
                    <img className="profile-pic" src={user?.photoURL || ''} alt='profile' width="30" height="30"/>
                    <button onClick={signUserOut}>Log Out</button>
                </>}
            </div>
        </div>
    )
}