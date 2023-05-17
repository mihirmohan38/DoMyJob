import React, { useState } from "react";
import "./App.css";
import { customise } from "./prompts/resume";

function App() {
  const [workExperience, setWorkExperience] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const { Configuration, OpenAIApi } = require("openai");

  const handleButtonClick = async () => {
    // Simulating API request with dummy string output
    console.log(process.env.OPENAI_API_KEY);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: customise(jobDescription, workExperience),
        temperature: 0,
        max_tokens: 100,
      });

      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Do My Job</h1>
      </header>
      <main>
        <div>
          <div className="translucent-box">
            <div className="input-container">
              <label htmlFor="work-experience">Your work experience:</label>
              <textarea
                id="work-experience"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                placeholder="Enter your work experience"
              />
            </div>
            <div className="input-container">
              <label htmlFor="job-description">Job description:</label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter the job description"
              />
            </div>
          </div>
          <button onClick={handleButtonClick}>Generate Text</button>
          {generatedText && (
            <div className="card">
              <p>{generatedText}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
