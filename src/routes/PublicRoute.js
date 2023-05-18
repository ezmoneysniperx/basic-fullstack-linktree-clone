import React from "react";
import {Navigate,Route} from 'react-router-dom';
import { getToken } from "../service/AuthService";


function PublicRoute({ children }) {
    return !getToken() ? <>{children}</> : <Navigate to="/premium-content" />;
  }


export default PublicRoute;