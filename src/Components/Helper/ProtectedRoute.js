import React from 'react';
import { Navigate, Route } from 'react-router';
import { UserContext } from '../../UserContext';

const ProtectedRoute = (props) => {
  const { logado } = React.useContext(UserContext);

  if (logado === true) return <Route {...props} />;
  else if (logado === false) return <Navigate to="/login" />;
  return null;
};

export default ProtectedRoute;
