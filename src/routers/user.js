const bcrypt = require('bcryptjs')
const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send('Login unsuccessful :(')
    }
})

router.post('/users', async (req, res) => {
    const user = User(req.body)

    try {
        const result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ })
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updatedUser = req.body

    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(updatedUser)
    const isValidOpertaion = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOpertaion) {
        res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        // findByIdAndUpdate bypasses middleware, so let's update ourself
        const user = await User.findById(_id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router