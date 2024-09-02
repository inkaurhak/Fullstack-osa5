import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const updateField = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={newBlog.title}
            name="title"
            onChange={updateField}
            placeholder='blog title here'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={newBlog.author}
            name="author"
            onChange={updateField}
            placeholder='blog author here'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={newBlog.url}
            name="url"
            onChange={updateField}
            placeholder='blog url here'
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm