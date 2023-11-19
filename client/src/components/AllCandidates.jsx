import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCandidateModal from './AddCandidateModal';

const AllCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the list of all candidates from your API
    axios.get('http://localhost:4000/api/candidates')
      .then(response => {
        setCandidates(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
        setLoading(false);
      });
  }, []);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddCandidate = async (formData) => {
    // Handle adding a candidate (e.g., make API request)
    console.log('Adding candidate:', formData);
    try {
        // Example candidate data, replace with actual data from your form or state
        const newCandidateData = {
          name: formData.name,
          email: formData.email,
          skills: formData.skills,
          experience: formData.experience,
        };
  
        const response = await axios.post('http://localhost:4000/api/candidates', newCandidateData);
  
        // Update state with the new candidate
        setCandidates((prevCandidates) => [...prevCandidates, response.data]);
      } catch (error) {
        console.error('Error creating candidate:', error);
      }
    // Close the modal after adding the candidate
    closeAddModal();
  };

  const handleDelete = async (candidateId) => {
    try {
      await axios.delete(`http://localhost:4000/api/candidates/${candidateId}`);

      // Update state by removing the deleted candidate
      setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate._id !== candidateId));
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-extrabold mb-4 text-white">All Candidates</h2>
      <button onClick={openAddModal} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add Candidate</button>
      {loading ? (
        <p className="text-gray-400">Loading candidates...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Candidate Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Skills</th>
                    <th scope="col" className="px-6 py-3">Experience</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {candidates.map(candidate => (
                    <tr key={candidate._id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4">{candidate.name}</td>
                    <td className="px-6 py-4">{candidate.email}</td>
                    <td className="px-6 py-4">{candidate.skills.join(", ")}</td>
                    <td className="px-6 py-4">{candidate.experience}</td>
                    <td className="px-6 py-4">
                        <button onClick={() => handleDelete(candidate._id)} className="font-medium text-blue-500 hover:underline">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      )}

      <AddCandidateModal isOpen={isAddModalOpen} onRequestClose={closeAddModal} onAddCandidate={handleAddCandidate} />
    </div>
  );
}

export default AllCandidates;