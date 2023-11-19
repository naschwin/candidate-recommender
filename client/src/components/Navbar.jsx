// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">Candidate Recommender</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Recommendations
          </Link>
          <Link to="/candidates" className="text-white hover:text-gray-300">
            All Candidates
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
