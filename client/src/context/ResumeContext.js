import { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    linkedin: 'linkedin.com/in/johndoe',
    education: [
      {
        institute: 'University of Example',
        degree: 'B.S. in Computer Science',
        years: '2020-2024',
        score: 'CGPA: 3.8/4.0'
      }
    ],
    technicalSkills: {
      programming: 'JavaScript, Python, Java',
      dataAnalysis: 'Pandas, NumPy, Tableau',
      developerTools: 'Git, Docker, AWS',
      webDevelopment: 'React, Node.js, Express',
      coursework: 'Data Structures, Algorithms, DBMS'
    },
    projects: [
      {
        title: 'Resume Builder App',
        description: 'Built a React-based resume builder with ATS integration',
        techStack: 'React, Node.js, PDFKit'
      }
    ],
    experience: [
      {
        company: 'Tech Corp',
        role: 'Frontend Developer',
        duration: '2023-Present',
        bullets: [
          'Developed user interfaces using React',
          'Optimized application performance by 40%'
        ]
      }
    ],
    certifications: 'AWS Certified Developer, Google Analytics Certified',
    extracurricular: 'Open Source Contributor, Tech Blog Writer'
  });

  const updateResumeData = (section, value) => {
    setResumeData(prev => ({ ...prev, [section]: value }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
