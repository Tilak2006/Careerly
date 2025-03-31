import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    const isHiring = choice === 'hire';
    localStorage.setItem('isHiring', JSON.stringify(isHiring));
    navigate('/home');
  };

  return (
    <motion.div 
      className="landing-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1  }}
      >
        WELCOME TO CAREERLY
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{  duration: 0.4, delay: 0.2 }}
      >
        Are you looking for a job or hiring talent?
      </motion.p>

      <div className="button-group">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleChoice('job')}
        >
          Looking for a Job
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleChoice('hire')}
        >
          Hiring for a Job
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Landing;
