
const { TaskModel } = require("../models/Task");





// Create a new task
const addTask = async (req, res) => {
    const payload = req.body
    try {
        const newTask = new TaskModel(payload);
        await newTask.save();

        res.status(201).json({ meg: "New task added" , newTask });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks
const allTask = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json({ msg: "List of all task", tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {

    const { id } = req.params
    const payload = req.body

    try {
        const updateTask = await TaskModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).json({msg:"task update"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete a task
const deleteTask =  async (req, res) => {
    const { id } = req.params
    try {
       const deleteTask =  await Task.findByIdAndDelete({_id:id});
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addTask , 
    allTask, 
    updateTask, 
    deleteTask
}