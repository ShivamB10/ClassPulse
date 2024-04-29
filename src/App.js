import React, { useState, useEffect } from 'react';
import './App.css';
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { GiveFeedback } from './giveFeedback';
import { CourseRegister } from "./courseRegister";
import NavBar from "./navbar";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebaseconfig';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);

    const PrivateRoute = ({ element, ...rest }) => {
        return (
            <Route
                {...rest}
                element={currentUser ? element : <Navigate to="/" replace />}
            />
        );
    };

    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
        console.log(formName);
    };

    return (
        <>
            <BrowserRouter>
                <NavBar /><br></br><br></br>
                <Routes>
                    <Route path="/" element={<Login onFormSwitch={toggleForm} />} />
                    <Route path="/classPulseregister" element={<Register onFormSwitch={toggleForm} />} />
                    <PrivateRoute path="/courseregister" element={<CourseRegister onFormSwitch={toggleForm} />} />
                    <Route path="/givefeedback" element={<GiveFeedback />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
