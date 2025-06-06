import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Blog from './pages/Blog';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { useEffect, useState } from 'react';
import HomePage from "./components/Homepage";
import Signup from "./pages/Signup"

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  return (
    <Router>
      <Navbar handleSignOut={signUserOut} isAuth={isAuth} />
      <Routes>
        <Route path="/blog" element={<Blog isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
        <Route path="/" element={<HomePage setIsAuth={setIsAuth} />} />   
      </Routes>
    </Router>
  );
}

export default App;
