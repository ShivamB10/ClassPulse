import React,{ useState } from 'react';
import './App.css';
import {Login} from "./login";
import {Register} from "./register";
import { GiveFeedback } from './givefeedback';
import NavBar from "./navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [currentForm, setCurrentForm] = useState('login');

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
        <Route path = "/register" element = {<Register onFormSwitch={toggleForm} />} />
        <Route path = "/givefeedback" element = {<GiveFeedback />} />
        
      </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;

