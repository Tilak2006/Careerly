import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import Jobs from './Jobs'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from './Post'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/jobs" element = {<Jobs />}/>
        <Route path="/post" element = {<Post />}/>
      </Routes>
    </Router>
  );
}

export default App
