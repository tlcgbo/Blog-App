import React, { useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/blog');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/blog');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Log In</h2>

        {errorMsg && <div className="text-red-400 text-sm mb-4 text-center">{errorMsg}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-[#0f172a] text-white rounded-lg border border-[#334155] focus:ring-2 focus:ring-indigo-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#0f172a] text-white rounded-lg border border-[#334155] focus:ring-2 focus:ring-indigo-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?
          <Link
            to="/signup"
            className="text-red"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-2">or</p>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
