import React, { useState } from 'react';
import './Post.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Job Posted!\nPost ID: ${postId}\nProfile: ${postProfile}\nDescription: ${postDescription}\nTech Stack: ${techStack.join(', ')}`);
  };

  return (
    <>
      <div className="posts-page">
        <h1 className="posts-center-text">Post Job</h1>
        <form className="posts-form" onSubmit={handleSubmit}>
          <label>Post ID</label>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter Post ID"
            required
          />

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