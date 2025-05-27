import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name);
    }

    const fetchResumes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/resumes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setResumes(data);
        } else {
          console.error('Failed to fetch resumes');
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCreateResume = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:5000/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: 'Untitled Resume' }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate(`/edit-resume/${data._id}`);
    } else {
      console.error('Failed to create resume:', data.message);
      alert('Failed to create resume: ' + data.message);
    }
  } catch (err) {
    console.error('Create error:', err);
    alert('An error occurred while creating the resume.');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center px-8">
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          ResumeBuilder
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium hidden sm:block">
            {userName}
          </span>
          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            👤
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Your Dashboard
        </h2>

        <div className="text-center mb-8">
          <button
            onClick={handleCreateResume}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            + Create New Resume
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No resumes found. Click the button above to create one.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {resume.title || 'Untitled Resume'}
                </h3>
                <p className="text-gray-500 mb-4 text-sm">
                  🕒 Last Modified: {new Date(resume.updatedAt).toLocaleString()}
                </p>
                <button
                  onClick={() => navigate(`/edit-resume/${resume._id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  ✏️ Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
