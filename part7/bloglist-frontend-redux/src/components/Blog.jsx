import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async (event, blog) => {
    event.preventDefault();
     dispatch(likeBlog(blog))
  };

  const handleDelete = async (event, blog) => {
    event.preventDefault();
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url} <br />
        <span>{`likes: ${blog.likes}`}</span>
        <button onClick={(event) => handleLike(event, blog)}>like</button> <br />
        {blog.user ? blog.user.name : ""} <br />
        {user && blog.user.id === user.userId && (
          <button onClick={(event) => handleDelete(event, blog)}>delete</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
