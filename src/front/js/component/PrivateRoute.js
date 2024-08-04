import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem('jwt-token');

    return token ? children : <Navigate to="/login" />;
};