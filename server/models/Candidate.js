// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  experience: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
