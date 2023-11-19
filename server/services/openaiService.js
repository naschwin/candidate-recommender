// // services/openaiService.js
const path = require('path');
const axios = require('axios')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Replace with your actual OpenAI API key
// const analyzeJobDescription = async (jobDescription) => {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt: `Find the top 3 candidates for the following job description, and give justification as to why:\n\n${jobDescription}`,
//         max_tokens: 100,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//       }
//     );

//     // Parse the OpenAI response and extract recommended candidates
//     const recommendedCandidates = parseOpenAIResponse(response.data.choices);

//     return recommendedCandidates;
//   } catch (error) {
//     console.error('Error communicating with OpenAI API:', error.message);
//     throw error;
//   }
// };

// const parseOpenAIResponse = (choices) => {
//   // Implement logic to parse OpenAI response and extract recommended candidates
//   // This may involve processing the choices and extracting relevant information

//   // For example:
//   const recommendedCandidates = choices.map((choice) => ({
//     name: choice.text,
//     // Add other candidate information as needed
//   }));

//   return recommendedCandidates;
// };

// module.exports = { analyzeJobDescription };

const OpenAI = require("openai");


const openai = new OpenAI({apiKey: OPENAI_API_KEY});

const candidates = [
  "Candidate 1 has a skillset of mern stack, and has 4 years of react experience",
  "Candidate 2 is a devops engineer, and has 4 years of product deployment experience"
]

// async function main() {
//   const completion = await openai.chat.completions.create({
//     // messages: [{"role": "system", "content": "You are an HR for a company and you have to select candidates based on the given job description and the candidate skills."},
//     //     {"role": "user", "content": `Who among these candidates ${candidates.join(" ")} is the best candidate for react developer role`}],
//     model: "gpt-3.5-turbo",
//     prompt: "what is the capital of india",
//     max_tokens: 20
//   });

//   console.log(completion.choices[0]);
// }
// main();

const analyzeJobDescription = async () => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-embedding-ada-002/completions',
      {
        prompt: `What is the capital of india`,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Parse the OpenAI response and extract recommended candidates
    const recommendedCandidates = parseOpenAIResponse(response.data.choices);

    return recommendedCandidates;
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error.message);
    throw error;
  }
};

analyzeJobDescription()
