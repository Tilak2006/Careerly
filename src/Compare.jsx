import React, { useMemo } from 'react';
import './Compare.css';

const Compare = ({ jobs, onBackToJobs }) => {
  // Find the job with minimum experience requirement
  const jobAnalysis = useMemo(() => {
    if (jobs.length < 2) return null;
    
    // Find the job with minimum experience
    const minExperienceJob = [...jobs].sort((a, b) => 
      (a.reqExperience || 0) - (b.reqExperience || 0)
    )[0];
    
    // Find the job with maximum experience
    const maxExperienceJob = [...jobs].sort((a, b) => 
      (b.reqExperience || 0) - (a.reqExperience || 0)
    )[0];
    
    // Calculate average experience
    const avgExperience = jobs.reduce((sum, job) => 
      sum + (job.reqExperience || 0), 0) / jobs.length;
      
    return {
      minExperienceJob,
      maxExperienceJob,
      avgExperience
    };
  }, [jobs]);

  // Function to determine which job is a better choice based on experience
  const getBetterJobRecommendation = () => {
    if (!jobAnalysis || jobs.length < 2) return null;
    
    // Getting more information about the tech stacks for better recommendation
    const techStackCounts = {};
    
    jobs.forEach(job => {
      job.postTechStack.forEach(tech => {
        if (!techStackCounts[tech]) {
          techStackCounts[tech] = 0;
        }
        techStackCounts[tech]++;
      });
    });
    
    // Get the most common technologies
    const commonTechs = Object.entries(techStackCounts)
      .filter(([_, count]) => count > 1)
      .map(([tech]) => tech);
    
    return (
      <div className="job-recommendation">
        <h3>Job Comparison Analysis</h3>
        
        <p>
          <strong>Entry Level Option:</strong> {jobAnalysis.minExperienceJob.postProfile} 
          ({jobAnalysis.minExperienceJob.reqExperience} years experience)
        </p>
        
        <p>
          <strong>Senior Level Option:</strong> {jobAnalysis.maxExperienceJob.postProfile}
          ({jobAnalysis.maxExperienceJob.reqExperience} years experience)
        </p>
        
        <div className="recommendation-box">
          <h4>Recommendation:</h4>
          <p>
            {jobAnalysis.minExperienceJob.reqExperience === jobAnalysis.maxExperienceJob.reqExperience ? (
              "All selected jobs require the same experience level. Choose based on other factors like company culture, salary, or specific technologies."
            ) : (
              <>
                If you're early in your career (less than {Math.ceil(jobAnalysis.avgExperience)} years of experience), 
                <strong> {jobAnalysis.minExperienceJob.postProfile}</strong> might be the better choice.
                <br /><br />
                If you're more experienced and looking for advanced roles, 
                <strong> {jobAnalysis.maxExperienceJob.postProfile}</strong> could offer more growth opportunities.
              </>
            )}
          </p>
          
          {commonTechs.length > 0 && (
            <p className="common-tech-note">
              <strong>Note:</strong> All these positions value skills in: {commonTechs.join(', ')}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="comparison-container">
      {jobs.length > 0 ? (
        <>
          <h2>Job Comparison</h2>
          
          {/* Recommendation section */}
          {getBetterJobRecommendation()}
          
          {/* Side-by-side comparison table */}
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Comparison Criteria</th>
                  {jobs.map(job => (
                    <th key={job.postId}>{job.postProfile}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>JOB ID</td>
                  {jobs.map(job => (
                    <td key={job.postId}>{job.postId}</td>
                  ))}
                </tr>
                <tr>
                  <td>EXPERIENCE REQUIRED</td>
                  {jobs.map(job => (
                    <td key={job.postId} className={job.reqExperience === jobAnalysis?.minExperienceJob.reqExperience ? 'highlight-low' : ''}>
                      {job.reqExperience} years
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>DESCRIPTION</td>
                  {jobs.map(job => (
                    <td key={job.postId}>{job.postDesc}</td>
                  ))}
                </tr>
                <tr>
                  <td>TECH STACK</td>
                  {jobs.map(job => (
                    <td key={job.postId}>
                      <ul className="tech-stack-list">
                        {job.postTechStack.map((tech, idx) => (
                          <li key={idx}>{tech}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Back button at the bottom */}
          <div className="back-button-container">
            <button 
              className="back-button" 
              onClick={onBackToJobs}
            >
              Back to Jobs
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>No jobs selected for comparison</h4>
          <div className="back-button-container">
            <button 
              className="back-button" 
              onClick={onBackToJobs}
            >
              Back to Jobs
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Compare;