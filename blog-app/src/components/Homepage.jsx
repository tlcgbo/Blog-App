import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 flex flex-col justify-center items-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
          Welcome to InkByte✒️
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-10">
          Share your thoughts. Read others'. Create posts, engage with ideas, and explore unique perspectives — all in one beautiful space.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/login"
            className="bg-indigo-800   text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 shadow-md"
          >
            Create a Post
          </Link>
          <Link
            to="/login"
            className="text-indigo-300 hover:text-purple-400 border border-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
