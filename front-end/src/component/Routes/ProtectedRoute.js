import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

            if (isAuthenticated === false) {
              return <Navigate to="/login" />;
            }

            if(role==="admin")
            {
              if(user.role==="admin")
              {
                return children
              }
              else{
                return <Navigate to="/login" />;
              }              
            }
            return children;
      }


export default ProtectedRoute;
