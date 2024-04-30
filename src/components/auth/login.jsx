import React, { useState } from 'react';
import Navbar from '../../navbar';
import './login.css';
import { ReactComponent as EmailIcon } from '../../images/envelope.svg';
import { ReactComponent as PasswordIcon } from '../../images/lock.svg';
import {auth} from "../../firebaseconfig";
import {signInWithEmailAndPassword} from "firebase/auth"
import { Link } from 'react-router-dom';


export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email,pass)
    .then((userCredential) => {
      alert("Login Successful")
    }).catch((error) => {
      alert("Enter Valid Password")
    })
  };

  return (
    <>
      <Navbar /> 
      <div className="login-container">
        <div className="login-content">
          <h2 className="login-title">Login Page</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"  ><EmailIcon width="24" height="24" /></span>
              </div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" name="email" placeholder="Email address" required />
            </div>
            <div className="mb-3 input-group ">
              <div className="input-group-prepend">
                <span className="input-group-text"><PasswordIcon  width="24" height="24" /></span>
              </div>
              <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Log in</button>
          </form>
          <div>
            <Link to="/classPulseregister" className="register-links">
            Don't have an account? Register Here
           </Link>
          </div>
        </div>
      </div>
    </>
  );
};

