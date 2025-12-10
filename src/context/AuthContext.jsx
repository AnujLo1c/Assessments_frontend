import { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
  }, []);
  const loginUser = (token) => {
    localStorage.setItem("token", token);
    console.log(token);
    
    setUser(token);
    
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
