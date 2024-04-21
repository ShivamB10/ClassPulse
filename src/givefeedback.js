import React, { useState } from 'react';
import Navbar from './navbar';
import './givefeedback.css';
import { ReactComponent as SendIcon } from './images/send.svg';

export const GiveFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(feedback);
    console.log(selectedCourse);
    setFeedback('');
  };

  return (
    <>
      <Navbar />
      <br></br>
      <div className="feedback-container">
        <div className="feedback-content">
          <h2 className="feedback-title">Give Feedback</h2>
          <form className="feedback-form" onSubmit={handleSubmit}>

            {/* Course selection dropdown */}
            <div className="form-group">
              <label htmlFor="course">Select Course:</label>
              <select
                className="form-control"
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Select a course</option>
                <option value="Course 1">DBMS</option>
                <option value="Course 2">OOD</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="feedback"
                rows="3"
                placeholder="Your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Send Feedback <SendIcon width="15" height="15" style={{ marginLeft: '5px' }} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
