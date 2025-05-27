// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateResumePage from './pages/CreateResumePage';
import ResumeDetailPage from './pages/ResumeDetailPage';
//import EditResumePage from './pages/EditResumePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/edit-resume/:id" element={<CreateResumePage />} />
        <Route path="/resume/:resumeId" element={<ResumeDetailPage />} /> 
        {/*<Route path="/edit-resume/:id" element={<EditResumePage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
