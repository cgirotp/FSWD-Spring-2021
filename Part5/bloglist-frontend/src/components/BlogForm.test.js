import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {

    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#newTitle')
    const author = component.container.querySelector('#newAuthor')
    const url = component.container.querySelector('#newUrl')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Jardinage facile' }
    })
    fireEvent.change(author, {
        target: { value: 'Dorothée Primevère' }
    })
    fireEvent.change(url, {
        target: { value: 'https://www.jardinsimple.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Jardinage facile')
    expect(createBlog.mock.calls[0][0].author).toBe('Dorothée Primevère')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.jardinsimple.com')

})