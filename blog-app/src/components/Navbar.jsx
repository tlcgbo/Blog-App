import { Link } from 'react-router-dom';

function Navbar({ handleSignOut, isAuth }) {
  return (
    <header className="bg-[#1e293b] shadow-md border-b border-[#334155]">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to={isAuth ? "/blog" : "/"} // 👈 Conditional redirect
          className="text-3xl font-bold text-cyan-400 hover:text-white transition-colors duration-200"
        >
          InkByte✒️
        </Link>

        <div className="flex items-center gap-6">
          {!isAuth ? (
            <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-200"
            >
              Signup
            </Link>
            </>
          ) : (
            <>
              <Link
                to="/createpost"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-200"
              >
                Create Post
              </Link>
              <Link
                to="/blog"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-200"
              >
                Posts
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition duration-200"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
