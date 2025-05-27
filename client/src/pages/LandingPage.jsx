import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaEye, FaCheckCircle } from 'react-icons/fa';
import Resume1_template from "../assets/Resume_img.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">ResumeBuilder</h1>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition shadow">
            Login
          </Link>

          <Link to="/signup" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition shadow">
            Sign Up
          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-24 py-20 grow">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Build Your <span className="text-blue-600">Professional Resume</span><br /> in Minutes
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            ResumeBuilder helps you create modern, ATS-optimized resumes effortlessly with real-time previews and smart suggestions.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-full shadow-lg transition"
          >
            Get Started
          </Link>
        </div>

        {/* Illustration */}
        <div className="w-full md:max-w-md">
          <img
            src={Resume1_template}
            alt="Resume Illustration"
            className="w-full"
          />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-white py-14 px-6 md:px-24 border-t">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaRobot className="text-3xl text-indigo-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-700 mb-2">ATS Optimization</h4>
            <p className="text-gray-600">Your resume is tailored to pass ATS filters and improve impact.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaEye className="text-3xl text-indigo-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-700 mb-2">Live Preview</h4>
            <p className="text-gray-600">Instant updates as you type. No need to guess what your resume looks like.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaCheckCircle className="text-3xl text-indigo-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-700 mb-2">Easy to Use</h4>
            <p className="text-gray-600">Intuitive UI that lets anyone build a standout resume in minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


