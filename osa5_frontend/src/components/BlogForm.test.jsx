import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<NoteForm /> calls callback function with correct information',async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('blog title here')
  const inputAuthor = screen.getByPlaceholderText('blog author here')
  const inputUrl = screen.getByPlaceholderText('blog url here')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'React patterns' )
  await user.type(inputAuthor, 'Michael Chan' )
  await user.type(inputUrl, 'https://reactpatterns.com/' )

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('React patterns')
  expect(createBlog.mock.calls[0][0].author).toBe('Michael Chan')
  expect(createBlog.mock.calls[0][0].url).toBe('https://reactpatterns.com/')
})