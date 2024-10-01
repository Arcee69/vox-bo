import React from 'react'
import { Navigate, useLocation, Outlet  } from 'react-router-dom';

import { isObjectEmpty } from '../utils/CheckLoginData';

import Layouts from '../layouts';

export const ProtectRoutes = () => {

    const location = useLocation();
    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))
    return !isAuthed ? (
      <Layouts> 
        <Outlet />
      </Layouts>
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  };

  export const AuthProtectRoutes = () => {

    const location = useLocation();
    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))
    return isAuthed ? (
      <>
        <Outlet />
      </>
    ) : (
      <Navigate to="/users" state={{ from: location }} replace />
    );
  };