const Todo = require ("../models/todoModel")


const createTodo = (req, res)=>{
    const {task, status, priority} = req.body

    const todo = new Todo({
    task: task,
    priority: priority
})

todo.save()

res.send({
    success: true,
    message: "todo created"
})

}

module.exports = {createTodo}

