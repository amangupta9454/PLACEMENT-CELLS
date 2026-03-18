import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // TODO: Replace with custom Loader

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'tpo' ? '/tpo' : '/student'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
