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

const bcryptjs = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcryptjs.hash(password, 8)
    const hashedPassword2 = await bcryptjs.hash(password, 8)
    const hashedPassword3 = await bcryptjs.hash(password, 8)

    console.log(hashedPassword)
    console.log(hashedPassword2)
    console.log(hashedPassword3)

    const isMatch = await bcryptjs.compare('Red12345!', hashedPassword)
    console.log(`isMatch : ${isMatch}`)
}

myFunction()