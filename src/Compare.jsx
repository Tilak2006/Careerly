import React from 'react';

const Compare = ({ jobs }) => {
  return (
    <div className="comparison-container">
      {jobs.length > 0 ? (
        <div>
          <h3>Selected Jobs for Comparison</h3>
          {jobs.map((job) => (
            <div key={job.postId}>
              <h4>{job.postProfile}</h4>
              <p><strong>Job ID:</strong> {job.postId}</p>
              <p><strong>Description:</strong> {job.postDesc}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <h4>No jobs selected for comparison</h4>
      )}
    </div>
  );
};

export default Compare;
