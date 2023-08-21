import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'
import Blogform from './Blogform'

test('renders blog´s title but does not render url and likes by default', () => {
  // Test object
  const blog = {
    title: 'Testiblogi',
    url: 'https://testiblogi.com',
    likes: 666
  }

  //Render component
  render(<Blog blog={blog} />)

  //Check that title is rendered
  const title = screen.getByText('Testiblogi')
  expect(title).toBeDefined()

  // Check that url and likes are not rendered
  const urlElement = screen.queryByText('https://testiblogi.com')
  const likesElement = screen.queryByText('likes: 42')
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})


test('blog details are rendered only after button "view" is clicked', async () => {
  //Test blog object
  const blog = {
      title: 'Testiblogi',
      author: 'Testailija',
      url: 'http://testi.com',
      likes: 1,
      user: { name: 'Testaaja666' }
    }

  //Test user object
  const testuser = {
    name: 'Testaaja666'
  }

  //Render component
  render(<Blog blog={blog} user={testuser} />)
    
  // Check that details are hidden before button click
  expect(screen.queryByText(blog.author)).toBeNull()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`${blog.likes}`)).toBeNull()
  expect(screen.queryByText(`${blog.user.name}`)).toBeNull()

  // Click the "view" button
  //const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  // Check that details are now rendered
  const author = screen.getByText('author: Testailija')
  expect(author).toBeDefined()
  const url = screen.getByText('url: http://testi.com')
  expect(url).toBeDefined()
  expect(screen.getByText(`likes: ${blog.likes}`)).toBeDefined()
  expect(screen.getByText(`created by user: ${blog.user.name}`)).toBeDefined()
})


test('event handler function is called twice when like button is clicked twice', async () => {
  // Test object
  const blog = {
    title: 'Testiblogi',
    author: 'Testailija',
    url: 'http://testi.com',
    likes: 1,
    user: { name: 'Testaaja666' },
  }

  //Mockhandler to mock "like" button's event handler
  const mockHandler = jest.fn()

  //Render component
  render(<Blog blog={blog} user={blog.user} updateBlog={mockHandler} />)

  // Click the "view" button to show the details (so that "like" button can be clicked)
  //const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  // Click the "like" button 2 times
  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  // Expect the updateBlog function to be called 2 times
  expect(mockHandler.mock.calls).toHaveLength(2)
})


test('<Blogform /> calls "createBlog" function when submitted', async () => {
  //Mockhandler to mock "createBlog" function
  const createBlog = jest.fn()

  // Render component
  const { container } = render(<Blogform createBlog={createBlog} />)
  const title = container.querySelector('#Title')
  const author = container.querySelector('#Author')
  const url = container.querySelector('#Url')
  const createButton = screen.getByText('create')

  //Fill rendered component with test data and click "create" button to send
  //const user = userEvent.setup()
  await userEvent.type(title, 'Testititle')
  await userEvent.type(author, 'Testiauthor')
  await userEvent.type(url, 'Testiurl')
  await userEvent.click(createButton)

  //Check that createBlog was called with test data
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testititle')
  expect(createBlog.mock.calls[0][0].author).toBe('Testiauthor')
  expect(createBlog.mock.calls[0][0].url).toBe('Testiurl')
})