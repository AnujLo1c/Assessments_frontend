import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import ForgotPassword from "../pages/Login/ForgotPassword";
import Tests from "../pages/Tests";
import Test from "../pages/Test";
import Results from "../pages/Results";
import Result from "../pages/Result";
import BackendLoader from "../pages/BackendLoader";
import Layout from "./Layout";
import { BackendGuard } from "../guards/BackendGuard";
import { AuthGuard } from "../guards/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/loading",
    element: <BackendLoader />,
  },

  {
    element: <BackendGuard />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          // ✔ Corrected route
          { path: "", element: <Home /> },  // "/" resolved properly

          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
          { path: "forgot-password", element: <ForgotPassword /> },

          {
            element: <AuthGuard />,
            children: [
              { path: "tests", element: <Tests /> },
              { path: "test/:id", element: <Test /> },
              { path: "results", element: <Results /> },
              { path: "result/:id", element: <Result /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/loading" replace /> },
]);

export default router;
