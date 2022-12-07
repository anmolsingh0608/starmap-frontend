import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import axiosUrl from "./axiosUrl";

const ProtectedRegister = () => {
  const nav = useNavigate();
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    const fetch = () => {
      //   if (dataFetchedRef.current) return;
      //   dataFetchedRef.current = true;
      //   axiosUrl.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${localStorage.getItem("token")}`;
      //   axiosUrl.get("/users/admin").catch((err) => {
      //     if (err.response.data.name === "TokenExpiredError") {
      //       alert("Session expired. Please login again.");
      //       localStorage.removeItem("token");
      //       localStorage.removeItem("userInfo");
      //       nav("/admin/login");
      //     }
      //   });
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = localStorage.getItem("token"); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRegister;
