import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import Jobs from './Jobs'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from './Post'
import Footer from './Footer'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/jobs" element={<Jobs searchQuery={searchQuery} />} />
        <Route path="/post" element = {<Post />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
