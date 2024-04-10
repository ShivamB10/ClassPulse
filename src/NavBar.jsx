
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavBar = () =>{
    return(
<nav class="navbar navbar-expand-sm bg-light fixed-top">

<div class="container-fluid">
  
  <div class="row w-100">
    <div class="col text-center">
        <a class="nav-link" href="#">Register</a>
    </div>
    <div class="col text-center">
        <a class="nav-link" href="#">Login</a>
    </div>
    <div class="col text-center">
        <a class="nav-link" href="#">Give Feedback</a>
    </div>
    <div class="col text-center">
        <a class="nav-link" href="#">View Feedback</a>
    </div>
    <div class="col text-center">
        <a class="nav-link" href="#" id="roleNavItem">
            <i class="bi bi-person"></i> Role: 
        </a>
    </div>
</div>
</div>

</nav>
    );
};
