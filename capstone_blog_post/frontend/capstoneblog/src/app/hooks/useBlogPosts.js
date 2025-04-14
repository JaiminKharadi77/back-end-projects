import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
  deletePost,
  updatePost,
  setEditingPost,
} from "../store/blogSlice";

const API_URL = "http://localhost:5000";

const useBlogPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);
  const editingPost = useSelector((state) => state.blog.editingPost);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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
      dispatch(setPosts(data.post));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

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

      const addedPost = await response.json();
      dispatch(
        addPost({ id: addedPost.id, title: newTitle, desc: newDescription })
      );
      setNewTitle("");
      setNewDescription("");
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

      dispatch(deletePost(postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditClick = (post) => {
    dispatch(setEditingPost(post));
    setEditTitle(post.title);
    setEditDescription(post.desc);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editingPost || !editTitle || !editDescription) return;

    try {
      const response = await fetch(`${API_URL}/edit`, {
        method: "PUT",
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

      const updatedPost = await response.json();
      dispatch(
        updatePost({
          id: editingPost.id,
          title: editTitle,
          desc: editDescription,
        })
      );
      dispatch(setEditingPost(null));
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCancelEdit = () => {
    dispatch(setEditingPost(null));
    setEditTitle("");
    setEditDescription("");
  };

  return {
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
  };
};

export default useBlogPosts;
