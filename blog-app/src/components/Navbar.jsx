import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { Link } from 'react-router-dom'

function Navbar({handleSignOut, isAuth}) {

   

  return (
    <div>
        <nav className="nav">
        <Link to='/'>Blog</Link>
       {
      !isAuth ? (
        <Link to='/login'>Login</Link> 
      ) : (
        <>
          <Link to='/createpost'>Create Post</ Link>
        <button onClick={handleSignOut} className="login-btn">Sign Out</button>
        </>
      )

       }
        
        
       
      </nav>
    </div>
  )
}

export default Navbar