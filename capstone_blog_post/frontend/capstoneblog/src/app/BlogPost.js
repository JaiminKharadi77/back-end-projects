import React from "react";

const BlogPost = ({ post, onDelete, onEdit }) => {
  return (
    <div className="blog-post p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.desc}</p>
      <div className="blog-post-actions flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => onEdit(post)}>Edit</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default BlogPost;
