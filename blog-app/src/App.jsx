import { Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Blog from './pages/Blog'

function App() {

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
     window.location.pathname = '/login'
    })
  }

  return (
    
    <Router> 

      <Navbar />
      <Routes>
      

      </Routes>
    </Router>
      
    
  )
}

export default App
