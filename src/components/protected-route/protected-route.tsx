import React from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../slices/user-slice/user-slice';
import { Preloader } from '../ui/preloader';
import { Navigate } from 'react-router-dom';

type protectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: protectedRouteProps) => {
  const userData = useSelector(getUserData);

  if (userData.isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userData.isAuthenticated) {
    return <Navigate replace to={'/login'} />;
  }

  if (onlyUnAuth && userData.isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }

  return children;
};
