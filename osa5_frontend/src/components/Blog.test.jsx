import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('only renders title and author of the blog in hidden mode', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 22,
    user: {
      username: 'ethanp',
      name: 'Ethan Parker',
      id: '6635f33c449a782e583595bb'
    }
  }

  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.blogHidden')

  expect(div).toHaveTextContent('React patterns Michael Chan')
  expect(div).not.toHaveTextContent('https://reactpatterns.com/')
  expect(div).not.toHaveTextContent('22')
})

test('renders title, author, url and likes of the blog in visible mode', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 22,
    user: {
      username: 'ethanp',
      name: 'Ethan Parker',
      id: '6635f33c449a782e583595bb'
    }
  }

  const initialUser = {
    username: 'ethanp',
    name: 'Ethan Parker',
    id: '6635f33c449a782e583595bb'
  }

  const { container } = render(<Blog blog={blog} user={initialUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blogVisible')

  expect(div).toHaveTextContent('React patterns Michael Chan')
  expect(div).toHaveTextContent('https://reactpatterns.com/')
  expect(div).toHaveTextContent('22')
})

test('clicking like button twice calls event handle twice', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 22,
    user: {
      username: 'ethanp',
      name: 'Ethan Parker',
      id: '6635f33c449a782e583595bb'
    }
  }

  const initialUser = {
    username: 'ethanp',
    name: 'Ethan Parker',
    id: '6635f33c449a782e583595bb'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} blogs={[blog]} user={initialUser} addLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const like = screen.getByText('like')
  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
