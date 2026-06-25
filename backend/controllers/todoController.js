const Todo = require ("../models/todoModel")


const createTodo = (req, res)=>{
    const {task, status, priority} = req.body

    if(!task || !priority){
     return res.send({
        success: false,
        message: "Please provide both task and priority."
     })
    }

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

const allTodos = async (req, res) =>{
   let data = await Todo.find({})
   res.send({
    success: true,
    message: "Todo collected",
    data: data
   })
}

module.exports = {createTodo, allTodos}

