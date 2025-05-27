// src/components/ResumeFeedback.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ResumeFeedback({ resumeData }) {
  // resumeData is an object containing your form's data per section, e.g.
  // { summary: '', skills: '', experience: '', education: '' }

  const [jobDescription, setJobDescription] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prepare resume sections as an array of {title, content}
  const prepareSections = () => {
    return Object.entries(resumeData).map(([title, content]) => ({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      content,
    }));
  };

  const handleGetFeedback = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter the job description.');
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await axios.post('/api/resume-feedback', {
        jobDescription,
        resumeSections: prepareSections(),
      });

      setFeedback(res.data.feedback);
    } catch (error) {
      console.error(error);
      alert('Failed to get feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Resume Feedback</h2>

      <label>Paste Job Description:</label>
      <textarea
        rows={6}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="Paste the job description here..."
      />

      <button
        onClick={handleGetFeedback}
        disabled={loading}
        style={{ marginBottom: 20, padding: '8px 16px' }}
      >
        {loading ? 'Checking...' : 'Get Feedback'}
      </button>

      {feedback && (
        <div>
          <h3>Feedback Results:</h3>
          {feedback.map(({ sectionTitle, similarityScore, suggestion }) => (
            <div
              key={sectionTitle}
              style={{
                marginBottom: 15,
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 6,
                backgroundColor:
                  similarityScore < 0.6 ? '#ffe6e6' : '#e6ffe6',
              }}
            >
              <strong>{sectionTitle}</strong>{' '}
              <span>
                (Similarity: {(similarityScore * 100).toFixed(1)}%)
              </span>
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
