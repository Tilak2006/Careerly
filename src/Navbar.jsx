import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX , FiSearch} from "react-icons/fi";

function Navbar({ searchQuery, setSearchQuery }) {
  const [showSearch, setShowSearch] = useState(false);
  const handleIconClick = () => {
    setShowSearch(true);
  };

  const handleBlur = () => {
    setShowSearch(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const isHiring = JSON.parse(localStorage.getItem('isHiring'));

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
          
          {isHiring && (
            <li><Link to="/post" onClick={() => setIsOpen(false)}>POST</Link></li>
          )}
           <li><Link to="/saved" onClick={() => setIsOpen(false)}>SAVED</Link></li>
          <li>
            <div className="search-container">
      {showSearch ? (
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <FiSearch size={22} className="search-icon" onClick={handleIconClick} />
      )}
    </div>
          </li>
        </ul>
        
      </nav>
    </>
  );
}

export default Navbar;
