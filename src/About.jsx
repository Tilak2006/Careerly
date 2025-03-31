import React from 'react';
import './About.css';
import { motion } from 'framer-motion';

function About() {
  return (
    <section className="about">
      <motion.div 
        className="about-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About <span className="highlight">careerly</span></h1>
        <p>
          Welcome to Careerly, your one-stop platform for finding your dream job or hiring top talent.
          We bridge the gap between job seekers and companies, making the hiring process seamless.
        </p>
        <p>
          Whether you're a tech enthusiast, a creative designer, or a business expert, Careerly is designed to cater to your needs.
          With real-time updates, personalized job recommendations, and a user-friendly experience, we make careers happen.
        </p>
        <motion.button className="learn-more" whileHover={{ scale: 1.1 }}>Learn More</motion.button>
      </motion.div>
    </section>
  );
}

export default About;
