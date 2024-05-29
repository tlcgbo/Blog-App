import React from 'react'

const Login = () => {
  return (
    <div className='loginPage'>
    <p>Sign in with Google</p>
    <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
  </div>
  )
}

export default Login