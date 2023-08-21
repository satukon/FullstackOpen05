import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikeBtnClick= (event) => {
    event.preventDefault()
    updateBlog(blog)
    console.log('like button clicked')
  }

  const handleDeleteBtnClick= (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
    console.log('delete button clicked')
  }

  /**
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
  }
*/

  return (
    <div>

      <p>
        <b>{blog.title}</b> <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </p>

      {showDetails && (
        <div>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={(event) => handleLikeBtnClick(event, blog)}>like</button></p>
          <p>created by user: {blog.user.name}</p>

          {user.name === blog.user.name && (
            <p><button onClick={(event) => handleDeleteBtnClick(event, blog)}>delete</button></p>
          )}
          <hr></hr>
        </div>
      )}

    </div>
  )
}

export const Blogs = ({ blogs, user, handleUpdateBlog, handleDeleteBlog }) => {
  const sortedBlogs = [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)

  Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    handleUpdateBlog: PropTypes.func.isRequired,
    handleDeleteBlog: PropTypes.func.isRequired,
  }

  return (
    <div>
      <h2>Blogs</h2>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={handleUpdateBlog} deleteBlog={handleDeleteBlog} />
      )}
    </div>
  )
}