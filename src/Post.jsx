import React, { useState } from 'react';
import './Post.css';
import axios from 'axios';

const Post = () => {
  const [postProfile, setPostProfile] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [reqExperience, setReqExperience] = useState(''); // New state for required experience
  const [techStack, setTechStack] = useState([]);

  const availableTechStack = [
    'React', 'Node.js', 'Spring Boot', 'Python', 'AWS', 'Docker', 'Java', 'Javascript',
    'Go', 'Kotlin', 'Vue', 'Angular', 'Flutter', 'Django', 'Pytorch', 'Fullstack Development',
    'Kubernetes', 'Artificial Intelligence', 'Machine Learning', 'Tensorflow', 'Apache Kafka', 'Game Development'
  ];

  const handleTechStackChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setTechStack(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      postProfile,
      postDesc: postDescription,
      reqExperience,
      postTechStack: techStack,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/jobs', jobData);
      alert(`Job Posted Successfully! Post ID: ${response.data.postId}`);
      console.log('Response:', response.data);

      // Clear Form
      setPostProfile('');
      setPostDescription('');
      setReqExperience(''); 
      setTechStack([]);
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      alert('Failed to post job. Please check console for details.');
    }
  };

  return (
    <div className="posts-page">
      <h1 className="posts-center-text">POST</h1>
      <form className="posts-form" onSubmit={handleSubmit}>
        <label htmlFor="postProfile">Job Profile:</label>
        <input
          type="text"
          id="postProfile"
          value={postProfile}
          onChange={(e) => setPostProfile(e.target.value)}
          required
        />

        <label htmlFor="postDescription">Job Description:</label>
        <textarea
          id="postDescription"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
          required
        />

        {/* New Required Experience Field */}
        <label htmlFor="reqExperience">Required Experience (Years):</label>
        <input
          type="number"
          id="reqExperience"
          value={reqExperience}
          onChange={(e) => setReqExperience(e.target.value)}
          min="0"
          required
        />

        <label htmlFor="techStack">Tech Stack:</label>
        <select
          multiple
          id="techStack"
          onChange={handleTechStackChange}
          value={techStack}
          className="posts-techstack"
          required
        >
          {availableTechStack.map((tech, index) => (
            <option key={index} value={tech}>{tech}</option>
          ))}
        </select>

        <button type="submit">Post a Job</button>
      </form>
    </div>
  );
};

export default Post;
