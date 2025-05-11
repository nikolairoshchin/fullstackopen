import { createContext, useReducer } from "react";

const initialState = []

const blogReducer = (state, action) => {
    switch (action.type) {
      case "setBlogs": {
        return action.payload
      }
    }
  }

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
    const [blogs, blogsDispatch] = useReducer(blogReducer, initialState)
  
    return (
      <BlogContext.Provider value={[blogs, blogsDispatch] }>
        {props.children}
      </BlogContext.Provider>
    )
}

export default BlogContext