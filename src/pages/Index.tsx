
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    document.title = 'GoOrder Admin Portal';
  }, []);

  // Redirect to dashboard which will in turn check authentication
  return <Navigate to="/dashboard" replace />;
};

export default Index;
