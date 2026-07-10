const Todo = require ("../models/todoModel")

const createTodo = (req, res)=>{
    const {task, status, priority} = req.body
    console.log(req.file.path);
    

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

let todoDelete = async(req, res) =>{
    const {id} = req.params
      await Todo.findByIdAndDelete(id)
      res.send({
        success: true,
        message: "Todo deleted"
      })

}
 let todoUpdate = async (req, res) =>{
    const {id} = req.params
    let deleteTask = await Todo.findByIdAndUpdate({_id:id}, req.body)
    res.send({
        success: true,
        message: "Todo update"
      })
 }

module.exports = {createTodo, allTodos, todoDelete, todoUpdate}


