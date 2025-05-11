import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from '../reducers/blogReducer'

const CreateNewBlogForm = ({blogFormRef}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch()

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`New blog ${newBlog.title} by ${newBlog.author} added`, "box message"))
      clearForm()
      blogFormRef.current.toggleVisibility()
    } catch (exeption) {
      console.log(exeption);
    }
  };

  return (
    <form onSubmit={(event) => handleCreateNewBlog(event)}>
      <h2>create new</h2>
      <div>
        title:
        <input
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <div>
          author:
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            type="text"
            value={url}
            name="Author"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

CreateNewBlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};

export default CreateNewBlogForm;
