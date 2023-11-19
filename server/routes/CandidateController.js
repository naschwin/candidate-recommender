// server.js
require('dotenv').config();
const express = require('express')
const router = express.Router()
const Candidate = require('../models/Candidate.js');
const {getRandomCandidatesFromMongo, askLLM} = require('../services/utils.js')

router.post('/api/candidates', async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;

    const newCandidate = new Candidate({
      name,
      email,
      skills,
      experience,
    });

    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error('Error creating candidate:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/candidates', async (req, res) => {
  try {
    const allCandidates = await Candidate.find();

    res.json(allCandidates);
  } catch (error) {
    console.error('Error fetching candidates:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/api/candidates/:id', async (req, res) => {
  console.log(req)
  const candidateId = req.params.id;

  try {
    // const deletedCandidate = null
    const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);

    if (!deletedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json(deletedCandidate);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/recommended-candidates', async (req, res) => {
  try {
    const allCandidates = await Candidate.find();
    const { jobDescription } = req.query;
    console.log(jobDescription)
    const candidatesForPrompt = allCandidates.map((element, idx) => {
      return `Candidate ${element.name} has these Skills: [${element.skills.join(", ")}] and this is their work experience: ${element.experience}.`;
    }).join(' ');

    recommendedCandidates = await askLLM(jobDescription, candidatesForPrompt);
    const newString = JSON.parse(recommendedCandidates)
    // console.log(newString)

    res.json(newString);

  } catch (error) {
    console.log('Error fetching candidates - Sending Random Candidates instead');
    const randomCandidates = await getRandomCandidatesFromMongo(3);
    const justification = ["Best matches the job description", 
                           "Has these other qualities that could make this person the next best",
                           "This person's experience has qualities that would make them easiest to train"]
    const result = randomCandidates.reduce((acc, candidate, index) => {
      acc[`Candidate ${candidate.name}`] = justification[index];
      return acc;
    }, {});

    res.json(result);
  }
});


module.exports = router;

