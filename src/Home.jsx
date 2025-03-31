import "./Home.css";
import Jobs from "./Jobs";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function Home({isHiring} ) {
  const scrollToJobs = () => {
    const jobsSection = document.getElementById("jobs-section");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
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
