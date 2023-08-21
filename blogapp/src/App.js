import { useState, useEffect, useRef } from 'react'
import { Blogs } from './components/Blog'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login successful')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    setUser(null)
    setMessage('Logout successful')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleAddBlog = async (blogObjectToCreate) => {
    try {
      const newBlog = await blogService.create(blogObjectToCreate)
      newBlog.user = user
      setBlogs([...blogs, newBlog])
      blogFormRef.current.toggleVisibility()
      setMessage('Added ' + newBlog.title + ' by ' + newBlog.author + ' to blogs')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Error adding new blog. Missing title, author or url.')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      const updatedBlog = { ...blog }
      updatedBlog.likes = updatedBlog.likes + 1
      await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const loginPage = (
    <Loginform handleLogin={handleLogin} />
  )

  const loggedinPage =
    <div>
      <Togglable buttonLabel="create a new blog" buttonLabel2="cancel" ref={blogFormRef}>
        <Blogform createBlog={handleAddBlog} />
      </Togglable>
      <Blogs blogs={blogs} user={user} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog}/>
    </div>


  return (
    <div>
      <Notification message={message} />
      {user &&
      <p>
        {user.username} is logged in { }
        <button onClick={() => handleLogOut()}>Log out</button>
      </p>
      }
      {!user ? loginPage : loggedinPage}
    </div>
  )
}

export default App