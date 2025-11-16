import { Navigate, Outlet } from 'react-router';
import { useAuthDetails } from '@redux/auth/auth.hook';

const AuthRoute = () => {
  const { isUserLoggedIn } = useAuthDetails();
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;
