import React, { useState } from 'react';
import './Post.css';
import axios from 'axios';


const Post = () => {
  const [postId, setPostId] = useState('');
  const [postProfile, setPostProfile] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [techStack, setTechStack] = useState([]);

  const availableTechStack = ['React', 'Node.js', 'Spring Boot', 'Python', 'AWS', 'Docker', 'Java', 'Javascript', 'Go', 'Kotlin', 'Vue', 'Angular', 'Flutter', 'Django', 'Pytorch', 'Fullstack Development' ,'Kubernetes', 'Artificial Intelligence', 'Machine Learning', 'Tensorflow', 'Apache Kafka', 'Game Development'];

  const handleTechStackChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setTechStack(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      postProfile,
      postDescription,
      postTechStack: techStack,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/jobs', jobData);
      alert(`Job Posted Successfully! Post ID: ${response.data.postId}`);
      console.log('Response:', response.data);
  
      // Clear Form
      setPostProfile('');
      setPostDescription('');
      setTechStack([]);
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      alert('Failed to post job. Please check console for details.');
    }
  };

  return (
    <>
      <div className="posts-page">
        <h1 className="posts-center-text">Post Job</h1>
        <form className="posts-form" onSubmit={handleSubmit}>

          <label>Post Profile</label>
          <input
            type="text"
            value={postProfile}
            onChange={(e) => setPostProfile(e.target.value)}
            placeholder="Enter Job Profile"
            required
          />

          <label>Post Description</label>
          <textarea
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            placeholder="Enter Job Description"
            required
          ></textarea>

          <label>Tech Stack Required</label>
          <select
            className="posts-techstack"
            multiple
            onChange={handleTechStackChange}
          >
            {availableTechStack.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>

          <button type="submit">Submit Job</button>
        </form>
      </div>
    </>
  );
};

export default Post;