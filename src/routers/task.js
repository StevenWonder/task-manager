const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ })
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        const result = await task.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const body = req.body

    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(body)
    const invalidUpdates = []
    updates.forEach((update) => {
        if (!allowedUpdates.includes(update)) {
            invalidUpdates.push(update)
        }
    })

    if (invalidUpdates.length > 0) {
        res.status(400).send({
            error: `Invalid updates: ${invalidUpdates.join(', ')}`
        })
    }

    try {
        const task = findById(_id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, body, {
        //     new: true,
        //     runValidators: true
        // })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await Task.findByIdAndDelete(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router