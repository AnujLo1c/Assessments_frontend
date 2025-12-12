import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
 
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
