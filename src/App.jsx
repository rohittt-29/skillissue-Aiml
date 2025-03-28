import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/authService';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JobPosting from './components/JobPosting';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
    setIsLoading(false);

    // Add event listener for storage changes (logout from other tabs)
    const handleStorageChange = () => {
      const user = getCurrentUser();
      setIsAuthenticated(!!user);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? 
            <Login onLoginSuccess={handleLoginSuccess} /> : 
            <Navigate to="/dashboard" />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? 
            <Dashboard onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          }
        />

        <Route
          path="/create-job"
          element={
            isAuthenticated ? 
            <JobPosting onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          }
        />

        {/* Redirect root to login or dashboard based on auth status */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
