import { createContext, useContext, useState } from "react";

export const BackendContext = createContext(null);

export const BackendProvider = ({ children }) => {
  const [backendReady, setBackendReady] = useState(false);

  return (
    <BackendContext.Provider value={{ backendReady, setBackendReady }}>
      {children}
    </BackendContext.Provider>
  );
};

// Custom hook to use backend status
export const useBackend = () => {
  return useContext(BackendContext);
};
