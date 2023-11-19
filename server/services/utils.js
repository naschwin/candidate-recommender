const path = require('path');
const Candidate = require('../models/Candidate.js');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const OpenAI = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apiKey: OPENAI_API_KEY});

// Function to return random candidates from MongoDB
async function getRandomCandidatesFromMongo(numCandidates) {
    try {
      const allCandidates = await Candidate.find(); // Fetch all candidates from MongoDB
      const shuffledCandidates = allCandidates.sort(() => 0.5 - Math.random());
      return shuffledCandidates.slice(0, numCandidates);
    } catch (error) {
      console.error('Error fetching candidates from MongoDB:', error.message);
      throw error;
    }
}

const askLLM = async (jobDescription, candidates) => {
    const prompt = `This is the job description '${jobDescription}' for which you are to chose candidates. And these are the descriptions of the candidates '${candidates}' for that job, give me the top 3 candidates relevant to the job description and justify why. Return the answer in acsending order with the best being first as json, with key = candidate x, and value = justification. For example if a candidate named jean is selected then the response should be "key = Candidate jean, value = jean is/has etc.. (complete the sentence with the justification)"`
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a recruiter for a large company and will be given job description and and the list of candidates, you have to find the best among them." },
                { role: "user", content: prompt },
            ],
            max_tokens: 720
        });

        // console.log(completion.choices[0]['message']['content']);
        return completion.choices[0]['message']['content']
    } catch (error) {
        console.error('Error in askLLM:', error.message);
        throw new Error('Error in askLLM'); // Throw a new error
    }
};

module.exports = {
    getRandomCandidatesFromMongo,
    askLLM
};