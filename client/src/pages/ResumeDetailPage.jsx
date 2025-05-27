import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResumeDetailPage = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setResumeData(data);
      } else {
        alert("Failed to fetch resume");
      }
    };

    fetchResume();
  }, [resumeId]);

  const checkAtsScore = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ats/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: Object.values(resumeData).join(" ") })
      });
      const data = await res.json();
      setAtsScore(data.score);

      if (data.score < 85) {
        const sugRes = await fetch("http://localhost:5000/api/ats/improve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText: Object.values(resumeData).join(" ") })
        });
        const sugData = await sugRes.json();
        setSuggestions(sugData.suggestions);
      } else {
        alert("Excellent! Your resume is ATS-friendly.");
      }
    } catch (err) {
      alert("Error checking ATS score: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Resume ATS Checker</h1>
      {resumeData && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}>
          <h2>{resumeData.name}</h2>
          <p><strong>Email:</strong> {resumeData.email}</p>
          <p><strong>Phone:</strong> {resumeData.phone}</p>
          <p><strong>Education:</strong> {resumeData.education}</p>
          <p><strong>Experience:</strong> {resumeData.experience}</p>
          <p><strong>Projects:</strong> {resumeData.projects}</p>
          <p><strong>Skills:</strong> {resumeData.skills}</p>

          <button onClick={checkAtsScore} disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            {loading ? 'Checking ATS Score...' : 'Check ATS Score'}
          </button>

          {atsScore !== null && (
            <div style={{ marginTop: '20px' }}>
              <h3>ATS Score: {atsScore}%</h3>
              {atsScore < 85 && suggestions.length > 0 && (
                <div>
                  <h4>Suggestions to Improve:</h4>
                  <ul>
                    {suggestions.map((sug, idx) => (
                      <li key={idx}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeDetailPage;
