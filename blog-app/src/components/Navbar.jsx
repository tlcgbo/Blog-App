import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'

function Navbar() {

    const signUserOut = () => {
        signOut(auth).then(() => {
          localStorage.clear();
          setIsAuth(false);
         window.location.pathname = '/login'
        })
      }

  return (
    <div>
        <nav className="nav">
        <Link to='/'>Blog</Link>
       
        <Link to='/login'>Login</Link> 
        
        <>
          <Link to='/createpost'>Create Post</ Link>
        <button onClick={signUserOut} className="login-btn">Sign Out</button>
        </>
       
      </nav>
    </div>
  )
}

export default Navbar