import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import CreateNewBlogForm from "./components/CreateNewBlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import Login from './components/Login'

const App = () => {
  const [sortedView, setSortedView] = useState(true);
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

const user = useSelector(state => state.user)

  const handleSort = () => {
    const newArray = [].concat(blogs);
    sortedView
      ? newArray.sort((a, b) => b.likes - a.likes)
      : newArray.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });

    dispatch(setBlogs(newArray))
    setSortedView(!sortedView);
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateNewBlogForm 
              blogFormRef = {blogFormRef}
            />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      <button onClick={handleSort}>{sortedView ? "sort" : "unsort"}</button>
      <div data-testid="blogList">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
