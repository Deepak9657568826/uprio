const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    completed: {
        type: String,
        enum: ["pending", "complete"],
        default: "pending",
    },
},
    {
        timestamps: true
    }
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = {
    TaskModel
}

