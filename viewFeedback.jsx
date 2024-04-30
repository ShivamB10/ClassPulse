import React, { useState, useEffect } from 'react';
import './viewFeedback.css';

const ViewFeedback = () => {
  // This state will hold the list of feedback items
  const [feedbackList, setFeedbackList] = useState([]);

  // Dummy data for the feedback list
  const feedbackData = [
    {
      id: 1,
      title: 'Lecture Quality',
      content: 'The lecture was very informative and engaging.',
      author: 'John Doe'
    },
    {
      id: 2,
      title: 'Course Material',
      content: 'The course material is up-to-date and very relevant to current trends.',
      author: 'Jane Smith'
    },
    // Add more feedback items here
  ];

  // Simulate fetching data from a database on component mount
  useEffect(() => {
    // In a real application, you would fetch this data from a server
    setFeedbackList(feedbackData);
  }, []);

  return (
    <div className="feedback-container">
      <h1>View Feedback</h1>
      <div className="feedback-list">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <h3 className="feedback-title">{feedback.title}</h3>
            <p className="feedback-content">{feedback.content}</p>
            <p className="feedback-author">- {feedback.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFeedback;