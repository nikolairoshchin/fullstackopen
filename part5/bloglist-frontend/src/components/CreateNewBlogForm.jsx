import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const CreateNewBlogForm = forwardRef(({ handleCreateNewBlog }, refs) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(refs, () => {
    return {
      clearForm
    }
  })

  return (
    <form onSubmit={(event) => handleCreateNewBlog(event, title, author, url)}>
      <h2>create new</h2>
      <div>
      title:
        <input
          data-testid='title'
          type = "text"
          value = {title}
          name = "Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <div>
        author:
          <input
            data-testid='author'
            type = "text"
            value = {author}
            name = "Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            data-testid='url'
            type = "text"
            value = {url}
            name = "Author"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </div>
    </form>
  )})

CreateNewBlogForm.propTypes = {
  handleCreateNewBlog: PropTypes.func.isRequired
}

export default CreateNewBlogForm