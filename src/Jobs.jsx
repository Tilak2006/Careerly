import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './Jobs.css';
import { FiExternalLink, FiBookmark } from 'react-icons/fi';
import mockJobs from './mockJobs.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Compare from './Compare'; 

const Jobs = ({ searchQuery, onClick }) => {
    const navigate = useNavigate(); 
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showComparison, setShowComparison] = useState(false); 
    const isHiring = useMemo(() => JSON.parse(localStorage.getItem('isHiring') || 'false'), []);
    const API_URL = 'http://localhost:8080/api/jobs';
    const [alertMessage, setAlertMessage] = useState('');
    const alertTimeout = useRef(null);

    const fetchJobs = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            setJobs(response.data);
        } catch (error) {
            console.error('API failed, using mock data:', error);
            setJobs(mockJobs);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handlePostJob = useCallback(async (newJob) => {
        try {
            const response = await axios.post(API_URL, newJob);
            setJobs((prevJobs) => [...prevJobs, response.data]);
            console.log('Job posted successfully:', response.data);
        } catch (error) {
            console.error('Error posting job:', error.response?.data || error.message);
        }
    }, [API_URL]);

    const handleDelete = useCallback(async (jobId) => {
        if (!isHiring) return;

        try {
            await axios.delete(`${API_URL}/${jobId}`);
            setJobs((prevJobs) => prevJobs.filter((job) => job.postId !== jobId));
            console.log('Job deleted successfully');
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    }, [API_URL, isHiring]);

    const handleSelectJob = (job) => {
        setSelectedJobs((prevSelectedJobs) => {
            if (prevSelectedJobs.some((selectedJob) => selectedJob.postId === job.postId)) {
                return prevSelectedJobs.filter((selectedJob) => selectedJob.postId !== job.postId);
            } else {
                return [...prevSelectedJobs, job];
            }
        });
    };

    const handleSaveJob = useCallback((job) => {
        try {
            const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');

            if (savedJobIds.includes(job.postId)) {
                setAlertMessage('Job already saved!');
            } else {
                const updatedSavedJobIds = [...savedJobIds, job.postId];
                localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobIds));
                localStorage.setItem(`job-${job.postId}`, JSON.stringify(job));
                setAlertMessage('Job saved successfully!');
            }
        } catch (error) {
            console.error('Error saving job:', error);
            setAlertMessage('Error saving job.');
        } finally {
            clearTimeout(alertTimeout.current);
            alertTimeout.current = setTimeout(() => setAlertMessage(''), 2000);
        }
    }, []);

    useEffect(() => {
        return () => clearTimeout(alertTimeout.current);
    }, []);

    const filteredJobs = useMemo(() => {
        const trimmedSearchQuery = searchQuery?.trim()?.toLowerCase();

        if (!trimmedSearchQuery) {
            return jobs;
        }

        return jobs.filter(job =>
            job.postProfile?.toLowerCase().includes(trimmedSearchQuery) ||
            job.postDescription?.toLowerCase().includes(trimmedSearchQuery) ||
            job.postTechStack?.some(tech => tech?.toLowerCase().includes(trimmedSearchQuery))
        );
    }, [searchQuery, jobs]);
    
    const handleCompare = () => {
        if (selectedJobs.length >= 2) {
            setShowComparison(true);
        } else {
            setAlertMessage('Please select at least 2 jobs to compare');
            clearTimeout(alertTimeout.current);
            alertTimeout.current = setTimeout(() => setAlertMessage(''), 2000);
        }
    };
    
    const handleBackToJobs = () => {
        setShowComparison(false);
    };

    return (
        <div className="jobs-page">
            <h1 className="jobs-center-text">JOBS</h1>
            {alertMessage && <div className="job-alert">{alertMessage}</div>}
            
            {showComparison ? (
                <Compare jobs={selectedJobs} onBackToJobs={handleBackToJobs} />
            ) : (
                <div className="jobs-container">
                    <div className="jobs-grid">
                        {filteredJobs.map((job) => (
                            <div className="jobs-card" key={job.postId}>
                                <h3>{job.postProfile}</h3>
                                <p><strong>Job-Id:</strong> {job.postId}</p>
                                <p><strong>Description:</strong> {job.postDescription}</p>
                                <p><strong>Experience Required:</strong> {job.reqExperience} years</p>
                                <p><strong>Tech Stack Required:</strong></p>
                                <ul className="jobs-tech-list">
                                    {job.postTechStack.map((tech, idx) => (
                                        <li className="jobs-tech-item" key={idx}>{tech}</li>
                                    ))}
                                </ul>
                                <div className='twobuttons'>
                                    <a href="https://www.linkedin.com/jobs/" className="apply-now" aria-label={`Apply to ${job.postProfile} on LinkedIn`}>
                                        Apply Now <FiExternalLink />
                                    </a>
                                    {isHiring && (
                                        <button onClick={() => handleDelete(job.postId)} className="delete-job">
                                            Delete Job
                                        </button>
                                    )}
                                    <button onClick={() => handleSaveJob(job)} className="save-button" aria-label={`Save ${job.postProfile} to your bookmarks`}>
                                        <FiBookmark size={20} />
                                    </button>
                                    <div className="compare-checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelectJob(job)}
                                            checked={selectedJobs.some(selected => selected.postId === job.postId)}
                                            id={`compare-${job.postId}`}
                                        />
                                        <label htmlFor={`compare-${job.postId}`}></label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="compare-section">
                        <button
                            className="compare-button"
                            onClick={handleCompare}  
                            disabled={selectedJobs.length < 2}
                        >
                            Compare Selected Jobs ({selectedJobs.length})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;