import React,{useState} from 'react';
export const Register = (props) => {

    const [email,setEmail] = useState('');
    const [pass,setPassword] = useState('');
    const [name, setName] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [repass, setRepass] = useState('');

    const handleSubmit = (e) =>{
        if (pass !== repass) {
            alert("Password and Re-enter Password don't Match");
            e.preventDefault();
        }
    }

    
    return(  
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Full Name</label><br/>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter your Full Name' id='name' name='name' required></input><br/>
                <label htmlFor='email'>Email</label><br/>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  type='email' placeholder='Enter your email id' id='email' name='email' required></input><br/>
                <label htmlFor="role">Select an option:</label><br/>
                <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                    <option value="">Select...</option>
                    <option value="student">Student</option>
                    <option value="ta">TA</option>
                    <option value="teacher">Teacher</option>
                </select><br/>
                <label htmlFor='password'>Password</label><br/>
                <input value={pass} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' id='pass' name='pass' required></input><br/>
                <label htmlFor='repassword'>Re-enter your Password</label><br/>
                <input value={repass} onChange={(e) => setRepass(e.target.value)} type='password' placeholder='Re-enter your password' id='repass' name='repass' required></input><br/>
                <button>Log in</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </>
    )
}

