import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FiHome, FiInfo, FiMenu } from 'react-icons/fi';
import { FiShare2, FiCamera, FiUser } from 'react-icons/fi';


const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    description: '',
    status: 'student',
    university: '',
    profilePic: null
  });
  
  const [uniqueId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const fileInputRef = useRef();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          profilePic: event.target.result
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Profile link copied to clipboard!');
  };
  
  const statusOptions = ['student', 'teacher', 'working', 'intern'];

  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FiMenu />
          </button>
          <span className="logo"></span>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/home" className="nav-link">
                <FiHome />
                {!isSidebarCollapsed && <span className="nav-text">HOME</span>}
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                <FiInfo />
                {!isSidebarCollapsed && <span className="nav-text">ABOUT</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="content">
      <div className="user-profile-container">
      <div className="profile-layout">
        <div className="profile-left">
          <div className="profile-pic-container">
            <div className="profile-pic">
              {profileData.profilePic ? (
                <img src={profileData.profilePic} alt="Profile" />
              ) : (
                <FiUser className="default-profile-icon" />
              )}
            </div>
            <button 
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              <FiCamera />
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <button className="share-button" onClick={handleShareClick}>
            <FiShare2 /> share
          </button>
        </div>
        
        <div className="profile-right">
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
              placeholder="username"
              className="profile-input"
            />

          </div>
          
          
          <div className="form-group">
            <textarea
              name="description"
              value={profileData.description}
              onChange={handleInputChange}
              placeholder="description"
              className="profile-textarea"
            />
          </div>
          
          <div className="form-group">
            <select 
              name="status" 
              value={profileData.status}
              onChange={handleInputChange}
              className="profile-select"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="university"
              value={profileData.university}
              onChange={handleInputChange}
              placeholder="university"
              className="profile-input"
            />
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
  );
};

export default Dashboard;