import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { Link } from 'react-router-dom';

function HomePage({ isAuth }) {
  const [postLists, setPostList] = useState([]);

  const postCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setPostList((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 px-6 py-12 max-w-6xl mx-auto font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
          Welcome to InkByte✒️
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          Share your thoughts. Read others'. Explore unique perspectives.
        </p>
        {!isAuth && (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-indigo-800 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 shadow-md"
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
        )}
      </div>

      {/* Blog Grid */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {postLists.map((post) => {
          const isAuthor = isAuth && auth.currentUser?.uid === post.author?.id;
          return (
            <div
              key={post.id}
              className="bg-[#1e293b] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#334155] p-6 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-semibold leading-snug text-indigo-200 hover:text-purple-400 cursor-pointer transition-colors">
                    {post.title}
                  </h2>
                  {isAuthor && (
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors text-xl"
                      aria-label="Delete post"
                      title="Delete Post"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {post.postText.length > 300
                    ? post.postText.slice(0, 300) + '...'
                    : post.postText}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="italic text-sm text-gray-400">@{post.author?.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
