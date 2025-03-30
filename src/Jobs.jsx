import React from 'react';
import './Jobs.css';

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

const Jobs = () => {
  return (
    <div className="jobs-page">
      <h1 className="jobs-center-text">JOBS</h1>
      <div className="jobs-container">
        <div className="jobs-grid">
          {jobsData.map((job, index) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
