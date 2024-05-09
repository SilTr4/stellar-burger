import React from 'react';

type protectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: protectedRouteProps) => children;
