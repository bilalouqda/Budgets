import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import LoginPage from './components/authentifaction/login';
import AuthPage from './components/authentifaction/register';
import About from './components/About/about';
import BudgetPage from './components/Homebudget';
import Home from './components/HomePage/home';
import AdminDashboard from './components/dashbord/AdminDashbord';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    return children;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <BudgetPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
