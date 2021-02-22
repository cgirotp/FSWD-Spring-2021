const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('id property is defined', async () => {
        const response = await api.get('/api/blogs')
        for (let blog of response.body) {
            expect(blog.id).toBeDefined()
        }
    })

    describe('addition of a new note', () => {
        test('a valid blog can be added', async () => {
            const newBlog = {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/) 
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
            const titles = blogsAtEnd.map(r => r.title) 
            expect(titles).toContain('Canonical string reduction')
        })

        test('if likes property is missing, it is set to zero', async () => {
            const newBlog = {
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
        })

        test('blog without title and url is not added', async () => {
            const newBlog = {
                author: 'Robert C. Martin',
                likes: 10
            }  
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400) 
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()  
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        } 
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)  
        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
    test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()    
        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'salainen',
        } 
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)  
        expect(result.body.error).toContain('shorter than the minimum allowed length (3)')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is missing', async () => {
        const usersAtStart = await helper.usersInDb()    
        const newUser = {
            name: 'Superuser',
            password: 'salainen',
        } 
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)  
        expect(result.body.error).toContain('`username` is required')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})