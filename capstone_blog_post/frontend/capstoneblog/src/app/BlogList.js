"use client";

import React from "react";
import BlogPost from "./BlogPost";
import useBlogPosts from "./hooks/useBlogPosts";
const BlogList = () => {
  const {
    posts,
    editingPost,
    newTitle,
    newDescription,
    editTitle,
    editDescription,
    setNewTitle,
    setNewDescription,
    setEditTitle,
    setEditDescription,
    handleAddPost,
    handleDeletePost,
    handleEditClick,
    handleUpdatePost,
    handleCancelEdit,
  } = useBlogPosts();

  return (
    <div className="blog-container">
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>

      {/* Add/Edit Form */}
      {editingPost ? (
        <form onSubmit={handleUpdatePost} className="blog-form edit-form">
          <h2 className="text-2xl font-semibold mb-2">Edit Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update Post
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handleAddPost} className="blog-form add-form">
          <h2 className="text-2xl font-semibold mb-2">Add New Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Add Post
          </button>
        </form>
      )}

      {/* Blog Post List */}
      <div className="blog-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPost
              key={post.id} // Assuming posts have unique IDs from the API
              post={post}
              onDelete={handleDeletePost}
              onEdit={handleEditClick} // Pass the edit handler
            />
          ))
        ) : (
          <p className="text-gray-500">No posts yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
