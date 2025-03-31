import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FiHome, FiInfo, FiMenu } from 'react-icons/fi';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
        <div className='userpfp'>
            
        </div>
      </main>
    </div>
  );
};

export default Dashboard;