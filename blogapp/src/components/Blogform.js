import React, { useState } from 'react'

const Blogform = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <div>

      <h2>Create a new blog</h2>

      <form onSubmit={handleBlogSubmit}>

        <div>
        title:
          <input
            type="text"
            value={title}
            id="Title"
            onChange={handleTitleChange}
          />
        </div>

        <div>
        author:
          <input
            type="text"
            value={author}
            id="Author"
            onChange={handleAuthorChange}
          />
        </div>

        <div>
        url:
          <input
            type="text"
            value={url}
            id="Url"
            onChange={handleUrlChange}
          />
        </div>

        <button type="submit">create</button>

      </form>
    </div>
  )
}

export default Blogform