import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recommender from './components/Recommender';
import AllCandidates from './components/AllCandidates';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Recommender/>} />
        <Route path="/candidates" element={<AllCandidates/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
};

export default App;
