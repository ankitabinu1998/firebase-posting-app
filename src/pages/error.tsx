import './error.css'
import { useContext } from 'react'
import { ErrorContext } from '../App';
export const Error = (props:any) => {
    const {errorMsg,setErrorMsg} = useContext(ErrorContext);
    setErrorMsg("We could not find that page!");
    return (
        <div className='error-body'>
            <img className="error-pic" src="https://images.unsplash.com/photo-1495051964098-df2856bfee39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="broken" />
            <div className='error-text'>
                <h1>Sorry</h1>
                {/* <h3>{errorMsg}</h3> */}
                <h3>{props.msg || 'We could not find that page!'}</h3>
            </div>
        </div>
    )
}