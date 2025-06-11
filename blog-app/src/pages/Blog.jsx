import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

const Blog = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
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

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditText(post.postText);
  };

  const saveEdit = async () => {
    const postDoc = doc(db, 'posts', editingPostId);
    await updateDoc(postDoc, {
      title: editTitle,
      postText: editText
    });

    setPostList((prev) =>
      prev.map(post =>
        post.id === editingPostId ? { ...post, title: editTitle, postText: editText } : post
      )
    );

    setEditingPostId(null);
    setEditTitle('');
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditText('');
  };

  const toggleReaction = async (postId, currentLikes, currentDislikes, type) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const postRef = doc(db, "posts", postId);

    let updatedLikes = currentLikes || [];
    let updatedDislikes = currentDislikes || [];

    const hasLiked = updatedLikes.includes(userId);
    const hasDisliked = updatedDislikes.includes(userId);

    if (type === 'like') {
      updatedLikes = hasLiked
        ? updatedLikes.filter(id => id !== userId)
        : [...updatedLikes, userId];
      updatedDislikes = updatedDislikes.filter(id => id !== userId);
    } else {
      updatedDislikes = hasDisliked
        ? updatedDislikes.filter(id => id !== userId)
        : [...updatedDislikes, userId];
      updatedLikes = updatedLikes.filter(id => id !== userId);
    }

    await updateDoc(postRef, {
      likes: updatedLikes,
      dislikes: updatedDislikes
    });

    setPostList(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: updatedLikes, dislikes: updatedDislikes }
          : post
      )
    );
  };

  const filteredPosts = postLists.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 px-6 py-12 max-w-6xl mx-auto font-sans">
      <h1 className="text-5xl font-extrabold p-20 mb-10 text-center tracking-tight text-white">
        Latest Blog Posts
      </h1>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          className="w-full max-w-xl px-5 py-3 rounded-lg bg-[#1e293b] border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Search blog titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {filteredPosts.map((post) => {
          const isAuthor = isAuth && auth.currentUser && post.author?.id === auth.currentUser.uid;
          const hasLiked = post.likes?.includes(auth.currentUser?.uid);
          const hasDisliked = post.dislikes?.includes(auth.currentUser?.uid);

          return (
            <div
              key={post.id}
              className="bg-[#1e293b] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#334155] p-6 flex flex-col justify-between"
            >
              {editingPostId === post.id ? (
                <div>
                  <input
                    className="w-full mb-2 p-2 rounded bg-[#0f172a] border border-[#334155] text-white"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full mb-4 p-2 rounded bg-[#0f172a] border border-[#334155] text-white"
                    rows={5}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button onClick={saveEdit} className="px-4 py-2 bg-green-600 rounded text-white font-semibold">Save</button>
                    <button onClick={cancelEdit} className="px-4 py-2 bg-gray-500 rounded text-white font-semibold">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-2xl font-semibold leading-snug text-indigo-200 hover:text-purple-400 cursor-pointer transition-colors">
                        {post.title}
                      </h2>
                      {isAuthor && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors text-xl"
                            title="Delete Post"
                          >
                            🗑️
                          </button>
                          <button
                            onClick={() => startEditing(post)}
                            className="text-gray-400 hover:text-green-400 transition-colors text-xl"
                            title="Edit Post"
                          >
                            ✏️
                          </button>
                        </div>
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
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        onClick={() =>
                          toggleReaction(post.id, post.likes || [], post.dislikes || [], 'like')
                        }
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
                          hasLiked ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300'
                        }`}
                      >
                        ❤️ {post.likes?.length || 0}
                      </button>
                      <button
                        onClick={() =>
                          toggleReaction(post.id, post.likes || [], post.dislikes || [], 'dislike')
                        }
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
                          hasDisliked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-300'
                        }`}
                      >
                        👎 {post.dislikes?.length || 0}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
