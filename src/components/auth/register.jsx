import React, { useState } from 'react';
import './register.css'; // Import CSS file for register page styling
import { ReactComponent as EmailIcon } from '../../images/envelope.svg';
import { ReactComponent as PasswordIcon } from '../../images/lock.svg';
import { ReactComponent as PersonIcon} from '../../images/person-circle.svg';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebaseconfig";

export const Register = (props) => {
    const [email,setEmail] = useState('');
    const [pass,setPassword] = useState('');
    const [name, setName] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [repass, setRepass] = useState('');
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (pass !== repass) {
            alert("Password and Re-enter Password don't Match");            
        }
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          alert("User Registered Succesfully")
        }).catch((error) => {
          alert("User Already Exists")
        })
    }

    return(  
        <div className="register-container">
            <div className = "register-content">
            <h2 className="login-title">Register Page</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor='name'>Full Name</label>
                <div className="mb-3 input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"  ><PersonIcon width="24" height="24" /></span>
                    </div>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" name="name" placeholder='Enter your full name' required />
                </div>
                <label htmlFor='email'>Email</label>
                <div className="mb-3 input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"  ><EmailIcon width="24" height="24" /></span>
                    </div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" name="email" placeholder='Enter your email id' required />
                </div>
                <label htmlFor="role">Select an option:</label>
                <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                    <option value="">Select...</option>
                    <option value="student">Student</option>
                    <option value="ta">TA</option>
                    <option value="teacher">Teacher</option>
                </select>
                <label htmlFor='password'>Password</label>
                <div className="mb-3 input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><PasswordIcon  width="24" height="24" /></span>
                    </div>
                    <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' className="form-control" id="password" name="password"  required />
                </div>
                <label htmlFor='repassword'>Re-enter your Password</label>
                <div className="mb-3 input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><PasswordIcon  width="24" height="24" /></span>
                    </div>
                    <input value={repass} onChange={(e) => setRepass(e.target.value)} type="password" placeholder='Re-enter your password' className="form-control" id="repass" name="repass" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <div className="register-links">
                <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            </div>
            </div>
        </div>
    )
}

export default Register;
