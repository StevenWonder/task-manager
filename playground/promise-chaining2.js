require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6206b71cbf9235b70480624b').then((deletedTask) => {
//     console.log(deletedTask)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTaskAndCount = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('6206a125365aadaa744a9a3a').then((count) => {
    console.log(`Count: ${count}`)
}).catch((error) => {
    console.log(error)
})