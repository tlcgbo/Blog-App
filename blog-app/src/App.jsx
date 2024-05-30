import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Blog from './pages/Blog'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
import { useEffect, useState } from 'react'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));


  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    })
  }

  return (
    
    <Router> 

      <Navbar handleSignOut={signUserOut}/>
      <Routes>
        <Route path="/" element={<Blog isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
      
    
  )
}

export default App
