import React from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../slices/user-slice/user-slice';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type protectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: protectedRouteProps) => {
  const userData = useSelector(getUserData);
  const location = useLocation();
  console.log(location);

  if (userData.isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userData.isAuthenticated) {
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  if (onlyUnAuth && userData.isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
