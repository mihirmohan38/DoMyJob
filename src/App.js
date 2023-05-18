import React, { useState } from "react";
import "./App.css";
import { customise } from "./prompts/resume";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [workExperience, setWorkExperience] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(true);

  const { Configuration, OpenAIApi } = require("openai");

  const handleButtonClick = async () => {
    // Simulating API request with dummy string output
    setLoading(true);
    try {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: customise(jobDescription, workExperience),
        temperature: 0.5,
        max_tokens: 100,
      });
      setGeneratedText(response.data.choices[0].text);
      setLoading(false);
    } catch (error) {
      alert(error.message);
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
              {loading ? <p>Loading...</p> : <p>{generatedText}</p>}
            </div>
          )}
        </div>
      </main>
      <Analytics />
    </div>
  );
}

export default App;
