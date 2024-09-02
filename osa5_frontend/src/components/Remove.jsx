import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Remove = ({ blog, blogs, setBlogs, setMessage, user }) => {

  const removeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Delete ${blog.title}?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
        .then(error => {
          setMessage(`${blog.title} by ${blog.author} deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  if (blog.user.username === user.username) {
    return (
      <div>
        <button id='remove' onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
    )
  }
}

Remove.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Remove