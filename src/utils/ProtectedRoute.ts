import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authInstance from  './Auth';

interface ProtectedRouteProps {
  children: React.ReactElement;
  
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authInstance.isAuthenticated;
  const navigate = useNavigate();

  if (!isAuthenticated) {
   navigate('/login', { state: { from: location.pathname } });
   return null;
  } 

  
  return children;
  
};

export default ProtectedRoute;