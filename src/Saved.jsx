import React, { useState, useEffect, useCallback } from 'react';
import './Saved.css';
import { FiExternalLink, FiBookmark } from 'react-icons/fi';

const Saved = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const loadSavedJobs = useCallback(() => {
    try {
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const savedJobsData = savedJobIds.map(jobId => {
        const jobData = JSON.parse(localStorage.getItem(`job-${jobId}`));
        return jobData;
      }).filter(job => job !== null); // Filter out any null jobs (if a job was deleted)

      setSavedJobs(savedJobsData);
    } catch (error) {
      console.error('Error loading saved jobs:', error);
      setSavedJobs([]); // Ensure state is reset in case of an error
    }
  }, []);

  useEffect(() => {
    loadSavedJobs();
  }, [loadSavedJobs]);

  const handleRemoveFromSaved = (jobId) => {
    // Remove from local storage savedJobs array
    try {
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const updatedSavedJobIds = savedJobIds.filter(id => id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobIds));

      // Remove the item of the specific job saved
      localStorage.removeItem(`job-${jobId}`);

      // Update the UI
      setSavedJobs(prevJobs => prevJobs.filter(job => job.postId !== jobId));
    } catch (error) {
      console.error('Error removing job:', error);
    }
  };

  return (
    <div className="saved-page">
      <h1 className="saved-center-text">SAVED JOBS</h1>
      <div className="saved-container">
        {savedJobs.length === 0 ? (
          <p className="no-saved-jobs">No jobs saved yet.</p>
        ) : (
          <div className="saved-grid">
            {savedJobs.map((job) => (
              <div className="saved-card" key={job.postId}>
                <h3>{job.postProfile}</h3>
                <p><strong>Job-Id:</strong> {job.postId}</p>
                <p><strong>Description:</strong> {job.postDesc}</p>
                <p><strong>Experience Required:</strong> {job.reqExperience} years</p>
                <p><strong>Tech Stack Required:</strong></p>
                <ul className="saved-tech-list">
                  {job.postTechStack.map((tech, idx) => (
                    <li className="saved-tech-item" key={idx}>{tech}</li>
                  ))}
                </ul>
                <div className="twobuttons">
                  <a href="https://www.linkedin.com/jobs/" className="apply-now" aria-label={`Apply to ${job.postProfile} on LinkedIn`}>
                    Apply Now <FiExternalLink />
                  </a>
                  <button
                    onClick={() => handleRemoveFromSaved(job.postId)}
                    className="remove-job"
                    aria-label={`Remove ${job.postProfile} from saved jobs`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
