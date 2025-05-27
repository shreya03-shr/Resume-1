import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from '../components/Header';
import ResumeFormStep from '../components/ResumeForm';
import PreviewSection from '../components/ResumePreview';
import {
  titleSectionStyle, formSectionStyle, previewSectionStyle,
  inputStyle, textareaStyle, buttonStyle, atsResultStyle
} from '../components/styles';

function ResumeBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    resumeTitle: '',
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    education: '',
    skills: '',
    experience: '',
    projects: '',
    certifications: '',
    extracurricular: '',
  });
  const [atsResult, setAtsResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const previewRef = useRef(null);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to clear all form data?')) return;
    setData({
      resumeTitle: '',
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      education: '',
      skills: '',
      experience: '',
      projects: '',
      certifications: '',
      extracurricular: '',
    });
    setAtsResult(null);
    setStep(1);
  };

  const handleSaveToDashboard = () => {
    const saved = JSON.parse(localStorage.getItem('savedResumes') || '[]');
    saved.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('savedResumes', JSON.stringify(saved));
    alert('Resume saved to dashboard!');
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.resumeTitle || 'resume'}.pdf`);
  };

const analyzeATSLocally = () => {
  setLoading(true);
  setError(null);
  setAtsResult(null);

  try {
    // Define stopwords
    const stopwords = new Set([
      'the', 'and', 'for', 'are', 'but', 'not', 'with', 'that', 'this', 'from',
      'you', 'your', 'our', 'they', 'their', 'them', 'will', 'have', 'has',
      'was', 'were', 'had', 'been', 'can', 'could', 'would', 'should', 'may',
      'might', 'must', 'shall', 'about', 'into', 'onto', 'upon', 'such', 'these',
      'those', 'its', 'his', 'her', 'him', 'she', 'he', 'it', 'a', 'an', 'in', 'on',
      'of', 'to', 'as', 'is', 'at', 'by', 'be', 'if', 'or', 'so', 'do', 'does', 'did'
    ]);

    // Normalize and filter function
    const normalize = text =>
      text
        .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove punctuation
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopwords.has(word)); // Remove stopwords & short words

    // Return early if JD not present
    if (!jobDescription) {
      setError('⚠️ Please enter a job description.');
      setLoading(false);
      return;
    }

    // Format resume into a single string
    const resumeText = `
      ${data.fullName}
      ${data.email}
      ${data.phone}
      ${data.linkedin}
      ${data.education}
      ${data.skills}
      ${data.experience}
      ${data.projects}
      ${data.certifications}
      ${data.extracurricular}
    `;

    // Normalize resume and job description
    const resumeWords = new Set(normalize(resumeText));
    const jdWords = new Set(normalize(jobDescription));

    // Define keyword categories
    const mustHaveSkills = ['java', 'python', 'c++', 'git', 'restful', 'apis', 'aws', 'azure', 'gcp'];
    const csConcepts = ['data', 'structures', 'algorithms', 'testing', 'maintaining', 'lifecycle'];
    const softSkills = ['team', 'player', 'fastpaced', 'clean', 'efficient', 'code', 'user', 'experience'];
    const domainTerms = ['scalable', 'performance', 'software', 'engineer', 'design', 'develop'];

    const allKeywords = [...mustHaveSkills, ...csConcepts, ...softSkills, ...domainTerms];

    // Get matches and missing keywords
    const matchedKeywords = allKeywords.filter(word => resumeWords.has(word));
    const missingKeywords = allKeywords.filter(word => jdWords.has(word) && !resumeWords.has(word));

    const matchCount = matchedKeywords.length;
    const matchPercentage = ((matchCount / allKeywords.length) * 100).toFixed(2);

    // Helper for categorized missing keywords
    const getMissingByCategory = (category) =>
      category.filter(word => jdWords.has(word) && !resumeWords.has(word));

    const missingSkills = getMissingByCategory(mustHaveSkills);
    const missingConcepts = getMissingByCategory(csConcepts);
    const missingSoft = getMissingByCategory(softSkills);
    const missingDomain = getMissingByCategory(domainTerms);

    // Construct feedback message
    let feedback = `ATS Match Score: ${matchPercentage}%\n\n`;

    if (missingKeywords.length === 0) {
      feedback += `Excellent! Your resume covers all key terms from the job description.`;
    } else {
      feedback += `Your resume is missing some important keywords from the job description.\n\n`;
      if (missingSkills.length)
        feedback += `Must-Have Skills & Tools: ${missingSkills.join(', ')}\n\n`;
      if (missingConcepts.length)
        feedback += `CS Concepts: ${missingConcepts.join(', ')}\n\n`;
      if (missingDomain.length)
        feedback += `Domain-Relevant Terms: ${missingDomain.join(', ')}\n\n`;
      if (missingSoft.length)
        feedback += `Soft/Contextual Keywords: ${missingSoft.join(', ')}\n\n`;

      feedback += `Tip: Try incorporating these terms naturally into your experience, projects, or skills.\n\n`;
      feedback += `Example: “Developed scalable microservices using RESTful APIs on AWS, improving performance and user experience.”`;
    }

    // Update ATS result
    setAtsResult({
      score: `${matchPercentage}%`,
      feedback,
    });

  } catch (err) {
    console.error(err);
    setError('Failed to analyze resume. Please try again.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <section style={titleSectionStyle}>
        <input
          type="text"
          placeholder="Enter Resume Title"
          name="resumeTitle"
          value={data.resumeTitle}
          onChange={handleChange}
          style={{ ...inputStyle, width: '50%' }}
        />

        {/* Job Description Label and Textarea */}
        <div style={{ marginTop: 15, width: '50%' }}>
          <label
            htmlFor="jobDescription"
            style={{ display: 'block', marginBottom: 6, fontWeight: '600', fontSize: 14 }}
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            placeholder="Paste or type the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              border: '2px solid #ccc',
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: 14,
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Buttons Container */}
        <div
          style={{
            marginTop: 15,
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <button
            onClick={analyzeATSLocally}
            disabled={loading}
            style={{
              ...buttonStyle,
              backgroundColor: '#ffc107',
              padding: '10px 18px',
              fontWeight: '600',
              borderRadius: 6,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#e0a800';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#ffc107';
            }}
          >
            {loading ? 'Checking ATS...' : 'Check ATS Score'}
          </button>

          <button
            onClick={handleDelete}
            style={{
              ...buttonStyle,
              backgroundColor: '#dc3545',
              padding: '10px 18px',
              fontWeight: '600',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bb2d3b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
          >
            Delete
          </button>

          <button
            onClick={handleDownload}
            style={{
              ...buttonStyle,
              backgroundColor: '#28a745',
              padding: '10px 18px',
              fontWeight: '600',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
            Download PDF
          </button>
        </div>
      </section>

      <main style={{ flex: 1, display: 'flex', padding: 20, gap: 20, overflow: 'auto' }}>
        <section style={formSectionStyle}>
          <h2>Step {step} of 3</h2>
          <form>
            <ResumeFormStep
              step={step}
              data={data}
              handleChange={handleChange}
              inputStyle={inputStyle}
              textareaStyle={textareaStyle}
            />
          </form>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
              type="button"
            >Previous</button>
            {step === 3 ? (
              <button
                onClick={handleSaveToDashboard}
                style={{ ...buttonStyle, backgroundColor: '#20c997' }}
                type="button"
              >Save to Dashboard</button>
            ) : (
              <button
                onClick={() => setStep(s => Math.min(3, s + 1))}
                style={{ ...buttonStyle, backgroundColor: '#007bff' }}
                type="button"
              >Next</button>
            )}
          </div>
          {error && <p style={{ color: 'red', marginTop: 15 }}>{error}</p>}

          {atsResult && (
  <div style={atsResultStyle}>
  <h3>ATS Result</h3>
  <p><strong>Score:</strong> {atsResult.score}</p>
  <div>
    <strong>Feedback:</strong>
    {atsResult.feedback.split('\n').map((line, index) => (
      <p key={index} style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
        {line}
      </p>
    ))}
  </div>
</div>

)}



          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
        {/* Resume Preview */}
        <section ref={previewRef} style={previewSectionStyle}>
          <h1 style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>{data.fullName || 'Your Name'}</h1>
          <p style={{ textAlign: 'center' }}>
            {data.phone || 'Phone'} | {data.email || 'Email'} | {data.linkedin || 'LinkedIn'}
          </p>
          <hr style={{ margin: '10px 0 20px' }} />
          {['Education', 'Skills', 'Projects', 'Experience', 'Certifications', 'Extracurricular'].map((section) => (
            <PreviewSection
              key={section}
              title={section.replace('Skills', 'Technical Skills').replace('Extracurricular', 'Extracurricular Activities')}
              content={data[section.toLowerCase().replace(/ /g, '')]}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default ResumeBuilder;
