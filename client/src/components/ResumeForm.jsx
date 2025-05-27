import React from 'react';

function ResumeFormStep({ step, data, handleChange, inputStyle, textareaStyle }) {
  const fieldWrapperStyle = { marginBottom: '1rem' };
  const helperTextStyle = { fontSize: '0.85rem', color: '#777' };

  const renderInputField = (label, name, type = "text", style = inputStyle, placeholder = "") => (
    <div style={fieldWrapperStyle}>
      <label htmlFor={name}><strong>{label}:</strong></label><br />
      <input
        type={type}
        id={name}
        name={name}
        value={data[name]}
        onChange={handleChange}
        style={style}
        placeholder={placeholder}
      />
      {name === 'linkedin' && (
        <p style={helperTextStyle}>Include full URL, e.g., https://linkedin.com/in/yourname</p>
      )}
    </div>
  );

  const renderTextareaField = (label, name, placeholder = "") => (
    <div style={fieldWrapperStyle}>
      <label htmlFor={name}><strong>{label}:</strong></label><br />
      <textarea
        id={name}
        name={name}
        value={data[name]}
        onChange={handleChange}
        style={textareaStyle}
        rows={4}
        placeholder={placeholder}
      />
      {/*
      <p style={helperTextStyle}>
        Use <code>*bold*</code>, <code>- bullet point</code>, <code>[text](link)</code> for formatting.
      </p>*/}
    </div>
  );

  switch (step) {
    case 1:
      return (
        <>
          {renderInputField("Full Name", "fullName", "text", inputStyle, "e.g., John Doe")}
          {renderInputField("Email", "email", "email", inputStyle, "e.g., john@example.com")}
          {renderInputField("Phone Number", "phone", "text", inputStyle, "e.g., +1 123-456-7890")}
          {renderInputField("LinkedIn", "linkedin", "url", inputStyle, "https://linkedin.com/in/johndoe")}
        </>
      );

    case 2:
      return (
        <>
          {renderTextareaField("Education", "education", "B.Tech in CSE, XYZ University (2020–2024)")}
          {renderTextareaField("Technical Skills", "skills", "JavaScript\nPython\nReact")}
          {renderTextareaField("Experience", "experience", "Intern, ABC Corp\nBuilt dashboard with React.")}
        </>
      );

    case 3:
      return (
        <>
          {renderTextareaField("Projects", "projects", "Portfolio Website\nBuilt using React.")}
          {renderTextareaField("Certifications", "certifications", "AWS Certified Cloud Practitioner")}
          {renderTextareaField("Extracurricular Activities", "extracurricular", "Coding Club President")}
        </>
      );

    default:
      return <p>Invalid form step.</p>;
  }
}

export default ResumeFormStep;
