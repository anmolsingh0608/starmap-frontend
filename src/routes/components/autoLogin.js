import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AutoLogin = () => {
  const auth = localStorage.getItem("token"); // determine if authorized, from context or however you're doing it
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let role = "";
  if (userInfo) {
    role = JSON.parse(localStorage.getItem("userInfo")).role;
  }

  const user = useSelector((state) => state.user);
  // console.log(user, "user");

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth && user.profile.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Outlet />
  );
};

export default AutoLogin;
