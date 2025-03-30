import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar({ searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">careerly </div>
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>HOME</Link></li>
          <li><Link to="/jobs" onClick={() => setIsOpen(false)}>JOBS</Link></li>
          <li><Link to="/post" onClick={() => setIsOpen(false)}>POST</Link></li>
          <li>
            <div className="search-container">
              <input 
                type="search" 
                placeholder="search" 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa fa-search"></i>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
