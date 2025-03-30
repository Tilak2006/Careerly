import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo">careerly </div>
                    <ul className="nav-links">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/jobs">JOBS</Link></li>
                        <li><Link to="/post">POST</Link></li>
                        <li>
                        <div className="search-container">
                            <input type="search" placeholder="search"></input>
                            <i className="fa fa-search"></i>
                            </div>
                            </li>
                            
                    </ul>
            </nav>
        </>
    );
}

export default Navbar;
