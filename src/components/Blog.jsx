import { useState } from 'react'
import blogService from '../services/blogs'
import Remove from './Remove'

const Blog = ({ blog, blogs, setBlogs, setMessage, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { 
    display: infoVisible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { 
    display: infoVisible ? '' : 'none' ,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes += 1}

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

  return (
  <div>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={() => setInfoVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible} >
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(false)}>hide</button>
      </div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes}
        <button onClick={() => addLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <Remove 
        blog={blog} 
        blogs={blogs} 
        setBlogs={setBlogs} 
        setMessage={setMessage}
        user={user}
      />
    </div>
  </div>  
  )
}

export default Blog