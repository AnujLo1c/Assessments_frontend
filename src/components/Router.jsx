import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import Home from "../pages/Home";
import Results from "../pages/Results";
import Result from "../pages/Result";
import Tests from "../pages/Tests";
import Test from "../pages/Test";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import ForgotPassword from "../pages/Login/ForgotPassword";

const router = createBrowserRouter([
  {
    basepath: "/",
    element: <Layout />,   
    children: [
      { path: "/", element: <Home /> },
      {path:"/login", element:<Login />},
      {path:"/signup", element:<SignUp />},
      {path:"/forgot-password", element:<ForgotPassword />},
      { path: "/tests", element: <Tests /> },
      { path: "/test/:id", element: <Test /> },
      { path: "/results", element: <Results /> },
      { path: "/result/:id", element: <Result /> },
    ],
  },

  
  { path: "/test", element: <Results /> },
]);

export default router;
