import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './components/Router.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BackendProvider } from './context/BackendContext.jsx';

function App() {
useEffect(() => {
  const path = window.location.pathname + window.location.search;
  localStorage.setItem("last_path", path);
}, []);

  return (
    <BackendProvider>
      <AuthProvider>
         
        <RouterProvider router={router} />
      </AuthProvider>
    </BackendProvider>
  );
}

export default App
