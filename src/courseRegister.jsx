import React, { useState, useEffect } from 'react';
import './courseRegister.css'; 
import { db } from "./firebaseconfig";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const CourseRegister = (props) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [documentValues, setDocumentValues] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSem, setSelectedSem] = useState('');
    const auth = getAuth();

    const firestore = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch user data from "userData" collection
                    const querySnapshot = await getDocs(collection(firestore, "userData"));
                    querySnapshot.forEach((doc) => {
                        if (doc.exists()) {
                            // Assuming "name" is the field in "userData" that contains the user's name
                            setName(doc.data().name);
                            setRole(doc.data().role);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                // If the user is not logged in, set userName to empty string
                setName('');
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, [auth, firestore]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log("userName:", name); // Log userName to check its value

            // Check if userName is not empty before adding to "enroll" collection
            if (name) {
                addDoc(collection(firestore, "enroll"), {
                    Name: name,
                    Role: role,
                    Course: selectedCourse,
                    Semester: selectedSem
                });
                alert("User Registered Successfully");
            } else {
                alert("User name not found.");
            }
        } catch (error) {
            alert("Error registering user: " + error.message);
        }
        
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(firestore, 'courses'));
                const values = snapshot.docs.map(doc => doc.data());
                console.log(values);
                setDocumentValues(values);
                
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(firestore, 'courses'));
                const values = snapshot.docs.map(doc => doc.data());
                console.log(values);
                setDocumentValues(values);
                
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedCourse(event.target.value);
    };
    return(  
        <div className="register-container">
            <div className = "register-content">
            <h2 className="login-title">Course Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="course">Select Course:</label>
                <select id="course" value={selectedCourse} onChange={handleSelectChange}>
                    <option value="">Select...</option>
                        {documentValues.map((value, index) => (
                    <option key={index} value={value.Title}>
                        {value.Title}
                    </option>
                    ))}
                </select>
                <label htmlFor="role">Select Semester:</label>
                <select id="role" value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)} required>
                    <option value="">Select...</option>
                    <option value="summer2024">Summer 2024</option>
                    <option value="spring2025">Spring 2025</option>
                    <option value="fall2025">Fall 2025</option>
                </select>
                
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    )
}

export default CourseRegister;
