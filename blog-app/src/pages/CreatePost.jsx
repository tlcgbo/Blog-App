import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();

  const createPost = async () => {
    if (title.trim() && postText.trim()) {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: new Date()
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 px-6 py-12 flex justify-center">
      <div className="bg-[#1e293b] w-full max-w-2xl rounded-xl shadow-xl p-8 border border-[#334155]">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
          Create a New Post
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-[#0f172a] text-gray-100 border border-[#334155] focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">Post</label>
          <textarea
            className="w-full h-40 px-4 py-3 rounded-lg bg-[#0f172a] text-gray-100 border border-[#334155] resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Write your blog post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>

        <button
          onClick={createPost}
          className="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
