import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    const isHiring = choice === 'hire';
    localStorage.setItem('isHiring', JSON.stringify(isHiring));
    navigate('/home');
  };

  return (
    <div className="landing-container">
      <h1>WELCOME TO CAREERLY</h1>
      <p>Are you looking for a job or hiring talent?</p>
      <div className="button-group">
        <button onClick={() => handleChoice('job')}>Looking for a Job</button>
        <button onClick={() => handleChoice('hire')}>Hiring for a Job</button>
      </div>
    </div>
  );
}

export default Landing;
