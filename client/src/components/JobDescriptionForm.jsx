// src/JobDescriptionForm.js

import React, { useState } from 'react';

const JobDescriptionForm = ({ onSubmit }) => {
  
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the parent component's onSubmit function and pass the jobDescription
    onSubmit(jobDescription);
  };

  return (
    <form  onSubmit={handleSubmit}>
      <div className="w-full mb-4 rounded-lg bg-gray-700 border-gray-600">
          <div className="px-4 py-2 rounded-t-lg bg-gray-800">
              <label htmlFor="comment" className="sr-only">Job Description</label>
              <textarea id="comment" rows="3" cols="90" className="w-full px-0 text-sm border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required=""/>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
              <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                  <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-900 hover:bg-blue-800">
                      Submit
                  </button>
              </div>
          </div>
      </div>
    </form>
  );
};

export default JobDescriptionForm;
