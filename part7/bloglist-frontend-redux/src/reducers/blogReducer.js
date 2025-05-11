import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs (state, action) {
            return action.payload
        },
        addNewBlog (state, action) {
            return state.concat(action.payload)
        },
        updateBlog (state, action) {
            const blog = action.payload
            return (state.map(item => (item.id === blog.id ? blog : item)));
        },
        deleteBlog (state, action) {
            const blog = action.payload
            return (state.filter(item => item.id !== blog.id));
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const respond = await blogService.getAll()
        dispatch(setBlogs(respond))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const respond = await blogService.create(content)
        dispatch(addNewBlog(respond))
    }
}

export const likeBlog = (blog) => {
        const likes = blog.likes + 1;
        const currentUser = blog.user;
        const newBlog = {
            id: blog.id,
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: likes,
        };
    return async dispatch => {
        const response = await blogService.update(newBlog, blog.id)
        response.user = currentUser
        dispatch(updateBlog(response))
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.remove(blog.id)
        dispatch(deleteBlog(blog))
    }
}


export const { setBlogs, addNewBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer