import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

function Navbar({ searchQuery, setSearchQuery }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHiring = JSON.parse(localStorage.getItem('isHiring') || 'false');
  const searchInputRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchIconClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setShowSearch(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen && window.innerWidth <= 768) {
      setShowSearch(false);
    }
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      <Link to="/home" className="logo-link">
        <div className="logo">careerly</div>
      </Link>
      
      <div className="mobile-controls">
        <div className="mobile-search-container">
          {showSearch && (
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={handleSearchBlur}
              onKeyDown={handleSearchSubmit}
              className="search-input"
              aria-label="Search"
            />
          )}
          {(!showSearch || window.innerWidth > 768) && (
            <FiSearch 
              size={22} 
              className="search-icon" 
              onClick={handleSearchIconClick}
              aria-label="Open search"
            />
          )}
        </div>
        
        <div 
          className="hamburger" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Menu"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <li><Link to="/home" onClick={() => setIsOpen(false)}>HOME</Link></li>
        <li><Link to="/jobs" onClick={() => setIsOpen(false)}>JOBS</Link></li>
        
        {isHiring && (
          <li><Link to="/post" onClick={() => setIsOpen(false)}>POST</Link></li>
        )}
        <li><Link to="/saved" onClick={() => setIsOpen(false)}>SAVED</Link></li>
        
        <li className="desktop-search">
          <div className="search-container">
            {showSearch ? (
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleSearchBlur}
                onKeyDown={handleSearchSubmit}
                autoFocus
              />
            ) : (
              <FiSearch size={22} className="search-icon" onClick={handleSearchIconClick} />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;