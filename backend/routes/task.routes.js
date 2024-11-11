const express = require("express");
const { addTask, allTask, updateTask, deleteTask } = require("../controlllers/taskController");
const { authmiddleware } = require("../middleware/authmiddleware");

const taskRouter = express.Router();

taskRouter.post("/addTask", authmiddleware,  addTask)

taskRouter.get("/allTask",authmiddleware, allTask)

taskRouter.put("/updateTask/:id",authmiddleware, updateTask)

taskRouter.patch("/updateTask/:id",authmiddleware, updateTask)

taskRouter.delete("/deleteTask/:id",authmiddleware, deleteTask)


module.exports = {
    taskRouter
}