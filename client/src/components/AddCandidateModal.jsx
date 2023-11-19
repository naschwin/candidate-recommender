import React, { useState } from 'react';
import Modal from 'react-modal';

// Identify the root element of your app
const rootElement = document.getElementById('root');

// Set the appElement property for react-modal
Modal.setAppElement(rootElement);

const AddCandidateModal = ({ isOpen, onRequestClose, onAddCandidate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component
    const skillsArray = formData.skills.split(',').map((skill) => skill.trim());
    onAddCandidate({ ...formData, skills: skillsArray });
  };

  return (
        <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
            isOpen ? 'fixed' : 'hidden'
        } overflow-y-auto overflow-x-hidden top-4 right-0 left-0 bottom-0 m-auto z-50 h-modal justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Candidate
                    </h3>
                    <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={onRequestClose}
                    >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Candidate name" value={formData.name} onChange={handleInputChange} required=""/>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Candidate email" value={formData.email} onChange={handleInputChange} required=""/>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skills (comma-separated)</label>
                            <input type="text" name="skills" id="skills" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Candidate skills" value={formData.skills} onChange={handleInputChange} required=""/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                            <textarea name="experience" id="experience" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write experience here" value={formData.experience} onChange={handleInputChange} required=""/>
                        </div>
                        <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add Candidate
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
  );
};

export default AddCandidateModal;
