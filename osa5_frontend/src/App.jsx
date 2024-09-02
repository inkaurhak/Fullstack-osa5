import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort(
    (b1, b2) => (b1.likes < b2.likes) ? 1 : (b1.likes > b2.likes) ? -1 : 0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[] )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      .then(error => {
        setMessage(`${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes += 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blog => blog.id !== id ? blog: returnedBlog)
      })
      .then(error => {
        setMessage(`you liked ${blog.title}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={message} errorMessage={errorMessage}/>

        <Login setUser={setUser} setErrorMessage={setErrorMessage}/>

      </div>
    )
  }

  return (
    <div>

      <h2>blogs</h2>

      <Logout user={user} setUser={setUser}/>

      <Notification message={message} errorMessage={errorMessage}/>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          user={user}
          addLike={addLike}
        />
      )}

    </div>
  )
}

export default App