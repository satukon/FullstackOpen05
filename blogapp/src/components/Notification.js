const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message === 'Wrong username or password' || message === 'Error adding new blog. Missing title, author or url.') {
    return (
      <div className="errorMessage">
        {message}
      </div>
    )
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

export default Notification