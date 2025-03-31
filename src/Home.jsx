import "./Home.css";
import Jobs from "./Jobs";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function Home({isHiring} ) {
  return (
    <>
      <section className="Home">
        <div className="content">
          <motion.div 
            className="main-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>FIND YOUR DREAM <br /> JOB <br /> WITH EASE</h1>
          </motion.div>
        </div>
      </section>

      <motion.section 
        className="jobs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Jobs />
      </motion.section>
    </>
  );
}

export default Home;
