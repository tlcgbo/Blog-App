import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'


function Navbar({handleSignOut}) {

   

  return (
    <div>
        <nav className="nav">
        <Link to='/'>Blog</Link>
       
        <Link to='/login'>Login</Link> 
        
        <>
          <Link to='/createpost'>Create Post</ Link>
        <button onClick={handleSignOut} className="login-btn">Sign Out</button>
        </>
       
      </nav>
    </div>
  )
}

export default Navbar