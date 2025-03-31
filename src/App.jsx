import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import Jobs from './Jobs'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from './Post'
import Footer from './Footer'
import Landing from './Landing'
import Saved from './Saved'
import Dashboard from './Dashboard'

function App() {
  const isHiring = JSON.parse(localStorage.getItem('isHiring'));
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/*" element={
          <>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Routes>
              <Route path="/home" element={<Home isHiring={isHiring} />} />
              <Route path="/jobs" element={<Jobs searchQuery={searchQuery} />} />
              <Route path="/post" element={isHiring ? <Post /> : <h1>Verification system to be added soon</h1>} />
              <Route path="/saved" element={<Saved searchQuery={searchQuery} />} />
              <Route path="/dashboard" element={<Dashboard isHiring={isHiring} />} />

            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App
