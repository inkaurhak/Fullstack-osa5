import { useState } from 'react'
import Remove from './Remove'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, setMessage, user, addLike }) => {
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

  if (infoVisible) {
    return (
      <div style={showWhenVisible} className='blogVisible'>
        <div>
          {blog.title} {blog.author}
          <button id='hide' onClick={() => setInfoVisible(false)}>hide</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes}
          <button id='like' onClick={() => addLike(blog.id)}>like</button>
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
    )
  }

  return (
    <div style={hideWhenVisible} className='blogHidden'>
      {blog.title} {blog.author}
      <button id='view' onClick={() => setInfoVisible(true)}>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog