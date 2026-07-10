const mongoose = require ("mongoose")
const {Schema} = mongoose

const todoSchema = new Schema({
    task:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "active", "block"],
        default: "pending"
    },
    priority:{
        type: String,
        enum: ["high", "medium", "low"],
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    path:{
        type: String
    }
})

module.exports = mongoose.model("Todo", todoSchema)









