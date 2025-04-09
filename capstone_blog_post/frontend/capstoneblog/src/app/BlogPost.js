import React from "react";

const BlogPost = ({ post, onDelete, onEdit }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.desc}</p>
      <div className="blog-post-actions">
        <button onClick={() => onEdit(post)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default BlogPost;
