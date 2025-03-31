import "./Home.css";
import Jobs from "./Jobs";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FiUser, FiSun, FiMoon, FiLogIn, FiGrid } from "react-icons/fi";
import { useState, useCallback } from "react";

function Home({isHiring}) {
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const scrollToJobs = useCallback(() => {
    const jobsSection = document.getElementById("jobs-section");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const toggleProfileMenu = useCallback(() => setShowMenu(prev => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  return (
    <>
    <div className="profile-section">
        <FiUser size={36} className="profile-icon" onClick={toggleProfileMenu} />
        {showMenu && (
          <div className="profile-menu dropdown-menu">
            <Link to="/dashboard" className="dropdown-item"><FiGrid /> Dashboard</Link>
            <Link to="/login" className="dropdown-item"><FiLogIn /> Login</Link>
            <button onClick={toggleDarkMode} className="dropdown-item">
              {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>

      <section className="Home">
        <div className="content">
          <motion.div 
            className="main-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>FIND YOUR DREAM <br /> JOB <br /> WITH EASE</h1>
            <motion.button 
              className="scroll-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToJobs}
            >
              Browse Jobs
            </motion.button>
          </motion.div>
        </div>
      </section>

      <motion.section 
        id="jobs-section"
        className="jobs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Jobs />
      </motion.section>
    </>
  );
}

export default Home;
