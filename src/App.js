import React,{ useState } from 'react';
import './App.css';
import {Login} from "./login";
import {Register} from "./register";
import { NavBar } from "./NavBar";
function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    console.log(formName);
  }
  return (
    <>    
      <NavBar /><br/><br/>
      <div className="App">
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    </>

  );
}

export default App;
