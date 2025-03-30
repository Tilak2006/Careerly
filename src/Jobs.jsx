import React from 'react';
import './Jobs.css';
import { FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';


const jobsData = [
  {
    postProfile: 'Software Engineer',
    postId: '001',
    postDesc: 'Develop and maintain web applications.',
    reqExperience: 2,
    postTechStack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    postProfile: 'Data Scientist',
    postId: '002',
    postDesc: 'Analyze large datasets to derive insights.',
    reqExperience: 3,
    postTechStack: ['Python', 'Pandas', 'TensorFlow'],
  },
  {
    postProfile: 'Backend Developer',
    postId: '003',
    postDesc: 'Create and manage APIs and databases.',
    reqExperience: 4,
    postTechStack: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    postProfile: 'Backend Developer',
    postId: '003',
    postDesc: 'Create and manage APIs and databases.',
    reqExperience: 4,
    postTechStack: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    postProfile: 'Backend Developer',
    postId: '003',
    postDesc: 'Create and manage APIs and databases.',
    reqExperience: 4,
    postTechStack: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    postProfile: 'Backend Developer',
    postId: '003',
    postDesc: 'Create and manage APIs and databases.',
    reqExperience: 4,
    postTechStack: ['Java', 'Spring Boot', 'MySQL'],
  },
];

const Jobs = ({ searchQuery }) => {
  const filteredJobs = jobsData.filter(job =>
    job.postProfile?.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
    job.postDesc?.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
    job.postTechStack?.some(tech => tech?.toLowerCase().includes(searchQuery?.toLowerCase() || ""))
  );
  return (
    <div className="jobs-page">
  <h1 className="jobs-center-text">JOBS</h1>
  <div className="jobs-container">
    <div className="jobs-grid">
      {jobsData
        .filter((job) =>
          searchQuery
            ? job.postProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.postDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.postTechStack.some((tech) =>
                tech.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : true
        )
        .map((job, index) => (
          <div className="jobs-card" key={index}>
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
            <a href="#" className="apply-now">Apply Now <FiExternalLink /></a>
          </div>
        ))}
    </div>
  </div>
</div>
  );
};

export default Jobs;
