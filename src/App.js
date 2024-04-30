import React,{ useState } from 'react';
import './App.css';
import {Login} from "./components/auth/login";
import {Register} from "./components/auth/register";
import { GiveFeedback } from './giveFeedback';
import { HomePage } from './HomePage'; 
import { CourseRegister } from './courseRegister';
import { ViewFeedback } from './ViewFeedback'; 
import NavBar from "./navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {app} from './firebaseconfig';

function App() {

  const [currentForm, setCurrentForm] = useState('');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    console.log(formName);
  }
  return (
    <>    
      <BrowserRouter>
      <NavBar /><br></br><br></br>
      <Routes>
        <Route path = "/" element = {<Login onFormSwitch={toggleForm} />} />
        <Route path = "/homePage" element = {<HomePage onFormSwitch={toggleForm} />} />
        <Route path = "/classPulseregister" element = {<Register onFormSwitch={toggleForm} />} />
        <Route path = "/courseregister" element = {<CourseRegister onFormSwitch={toggleForm} />} />
        <Route path = "/givefeedback" element = {<GiveFeedback />} />
        <Route path = "/viewFeedback" element = {<ViewFeedback />} />
        
      </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;