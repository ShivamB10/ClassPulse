import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'; 
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light fixed-top shadow-sm">
            <div className="container-fluid navbar-nav">
                <div className="row w-100">
                    <div className="col text-center nav-item">
                        <Link className="nav-link" to ="/classPulseregister">User Registration</Link>
                    </div>
                    <div className="col text-center nav-item">
                        <Link className="nav-link" to ="/courseregister">Course Registration</Link>
                    </div>
                    <div className="col text-center  nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                    </div>
                    <div className="col text-center  nav-item">
                        <Link className="nav-link" to="/givefeedback">Give Feedback</Link>
                    </div>
                    <div className="col text-center  nav-item">
                        <Link className="nav-link" href="#">View Feedback</Link>
                    </div>
                    <div className="col text-center  nav-item">
                        <a className="nav-link" href="#" id="roleNavItem">
                            <i className="bi bi-person"></i> Role: 
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
