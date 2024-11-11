const express = require("express");
const { addTask, allTask, updateTask, deleteTask } = require("../controlllers.js/taskController");

const taskRouter = express.Router();

taskRouter.post("/addTask", addTask)

taskRouter.get("/allTask", allTask)

taskRouter.put("/updateTask/:id", updateTask)

taskRouter.patch("/updateTask/:id", updateTask)

taskRouter.delete("/deleteTask/:id", deleteTask)


module.exports = {
    taskRouter
}