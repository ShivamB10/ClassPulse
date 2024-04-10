import React, {useState} from 'react';
import './login.css'
import navbar from './navbar'

export const Login = (props) => {
    const [email,setEmail] = useState('');
    const [pass,setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }
    
    return(
        <>
        <navbar />
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor='email' className="form-label">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your email id' id='email' name='email' required></input><br/>
                <label htmlFor='password' className="form-label">Password</label>
                <input value={pass} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' id='password' name='password' required></input><br/>
                <button>Log in</button>
            </form>
            <button onClick={() => props.onFormSwitch('register')} >Don't have an account? Register here.</button>
        </>
        


    )
}