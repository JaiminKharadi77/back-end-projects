"use client";

import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";

const API_URL = "http://localhost:5000"; // Assuming this is your API endpoint

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingPost, setEditingPost] = useState(null); // Stores the post being edited
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch posts on initial load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle error state in UI if needed
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return; // Basic validation

    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, desc: newDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const addedPost = await response.json(); // Get the added post if needed
      setNewTitle("");
      setNewDescription("");
      fetchPosts(); // Re-fetch posts to include the new one
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${API_URL}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchPosts(); // Re-fetch posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditDescription(post.desc);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editingPost || !editTitle || !editDescription) return;

    try {
      const response = await fetch(`${API_URL}/edit`, {
        method: "PUT", // Or PATCH depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPost.id,
          title: editTitle,
          desc: editDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingPost(null);
      setEditTitle("");
      setEditDescription("");
      fetchPosts(); // Re-fetch posts to show the update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className="blog-container">
      <h1>My Blog</h1>

      {/* Add/Edit Form */}
      {editingPost ? (
        <form onSubmit={handleUpdatePost} className="blog-form edit-form">
          <h2>Edit Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
          />
          <button type="submit">Update Post</button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handleAddPost} className="blog-form add-form">
          <h2>Add New Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
          <button type="submit">Add Post</button>
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
          <p>No posts yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
