import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
    let component

    const blog = {
        title: 'Jardinage facile',
        author: 'Dorothée Primevère',
        url: 'https://www.jardinsimple.com',
        id:'603bb1779004ab22a8ce0215',
        likes: 12,
        user: { username: 'amelina', name: 'Amelie Girgioni', id: '60340a440eb43b24207fd238' }
    }

    const currentUser = 'Amelie Girgioni'

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} currentUser={currentUser} updateLikes={mockHandler} />
        )
    })

    test('renders the right content by default', () => {

        const divA = component.container.querySelector('.reducedBlog')

        expect(divA).not.toHaveStyle('display: none')

        expect(divA).toHaveTextContent(
            'Jardinage facile'
        )
        expect(divA).toHaveTextContent(
            'Dorothée Primevère'
        )
        expect(divA).not.toHaveTextContent(
            'https://www.jardinsimple.com'
        )
        expect(divA).not.toHaveTextContent(
            12
        )

        const divB = component.container.querySelector('.detailedBlog')

        expect(divB).toHaveStyle('display: none')

    })

    test('renders the right content when show is clicked', () => {

        const button = component.getByText('show')
        fireEvent.click(button)

        const divA = component.container.querySelector('.reducedBlog')

        expect(divA).toHaveStyle('display: none')

        const divB = component.container.querySelector('.detailedBlog')

        expect(divB).not.toHaveStyle('display: none')

        expect(divB).toHaveTextContent(
            'https://www.jardinsimple.com'
        )
        expect(divB).toHaveTextContent(
            12
        )

    })

    test ('clicking the button twice calls event handler twice', () => {

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })

})

