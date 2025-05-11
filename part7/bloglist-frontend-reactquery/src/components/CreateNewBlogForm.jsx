import { useState, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import PropTypes from "prop-types";
import BlogContext from '../context/BlogContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNotification } from '../services/useNotification'

const CreateNewBlogForm = ({blogFormRef}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, blogsDispatch] = useContext(BlogContext)

  const setNotification = useNotification()

  const newBlogMutation = useMutation({ mutationFn: async(newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      blogsDispatch({ type: 'setBlogs', payload: blogs.concat(response) })
    } catch (error) {
        console.log(error)
    }
  }
  })

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  const handleCreateNewBlog = async (event, title, author, url) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try {
      newBlogMutation.mutate( newBlog )
      clearForm()
      blogFormRef.current.toggleVisibility() 
      setNotification(`New blog ${newBlog.title} by ${newBlog.author} added`, 'box message')
    } catch (exeption) {
      console.log(exeption)
    }
  }

  return (
    <Form onSubmit={(event) => handleCreateNewBlog(event, title, author, url)}>
    <h2>create new</h2>
                <Form.Control
                  value = {title}
                  name = "Title"
                  placeholder='Title'
                  onChange={({ target }) => setTitle(target.value)}
                />
                <br />
                <Form.Control
                  value = {author}
                  name = "Author"
                  placeholder='Author'
                  onChange={({ target }) => setAuthor(target.value)}
                />
                <br />
                <Form.Control
                  value = {url}
                  name = "URL"
                  placeholder='url'
                  onChange={({ target }) => setUrl(target.value)}
                />
              <br />
              <Button type="submit" size="sm" >Create</Button>
      </Form>
  )}

CreateNewBlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};

export default CreateNewBlogForm