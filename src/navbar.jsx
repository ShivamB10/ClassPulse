import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'; 
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light fixed-top shadow-sm">
            <div className="container-fluid navbar-nav">
                <div className="row w-100">
                    <div className="col text-center nav-item">
                        <a className="nav-link" href="#">Register</a>
                    </div>
                    <div className="col text-center  nav-item">
                        <a className="nav-link" href="#">Login</a>
                    </div>
                    <div className="col text-center  nav-item">
                        <a className="nav-link" href="#">Give Feedback</a>
                    </div>
                    <div className="col text-center  nav-item">
                        <a className="nav-link" href="#">View Feedback</a>
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
