import React, { useState, useEffect } from 'react';
import './Jobs.css';
import { FiExternalLink } from 'react-icons/fi';
import axios from 'axios';

const Jobs = ({ searchQuery }) => {
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({
    postProfile: '',
    postDesc: '',
    reqExperience: '',
    postTechStack: '',
  });

  const API_URL = 'http://localhost:8080/api/jobs';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handlePostJob = async (newJob) => {
    try {
      const response = await axios.post(API_URL, newJob);
      setJobs((prevJobs) => [...prevJobs, response.data]);
      console.log('Job posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
    }
  };

  const handleFetchJobById = async (jobId) => {
    try {
      const response = await axios.get(`${API_URL}/${jobId}`);
      console.log('Job details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching job details:', error.message);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${API_URL}/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.postId !== jobId));
      console.log('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...jobData,
      postTechStack: jobData.postTechStack.split(',').map((tech) => tech.trim())
    };
    handlePostJob(newJob);
    setJobData({ postProfile: '', postDesc: '', reqExperience: '', postTechStack: '' });
  };

  const filteredJobs = jobs.filter(job =>
    searchQuery?.trim() &&
    (job.postProfile?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
     job.postDesc?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
     job.postTechStack?.some(tech => tech?.toLowerCase().includes(searchQuery?.toLowerCase()))
    )
  );

  return (
    <div className="jobs-page">
      <h1 className="jobs-center-text">JOBS</h1>
      <div className="jobs-container">
        <div className="jobs-grid">
          {(filteredJobs.length > 0 ? filteredJobs : jobs).map((job) => (
            <div className="jobs-card" key={job.postId}>
              <h3>{job.postProfile}</h3>
              <p><strong>Job-Id:</strong> {job.postId}</p>
              <p><strong>Description:</strong> {job.postDesc}</p>
              <p><strong>Experience Required:</strong> {job.reqExperience} years</p>
              <p><strong>Tech Stack Required:</strong></p>
              <ul className="jobs-tech-list">
                {job.postTechStack.map((tech, idx) => (
                  <li className="jobs-tech-item" key={idx}>{tech}</li>
                ))}
              </ul>
              <div className='twobuttons'>
              <a href="#" className="apply-now">Apply Now <FiExternalLink /></a>
              <button onClick={() => handleDelete(job.postId)} className="delete-job">Delete Job</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
