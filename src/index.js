const express = require('express')
require('./db/mongoose')

const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

// Parse incoming JSON to an object
app.use(express.json())

// Register the routers with express
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})