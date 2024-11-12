import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

function TodoPage() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [completed, setCompleted] = useState('pending');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('none');

    const toast = useToast()

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://uprio-hb32.onrender.com/task/allTask', {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setTasks(response.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        const newTask = { title, description, dueDate, priority, completed };
        try {
            await axios.post('https://uprio-hb32.onrender.com/task/addTask', newTask, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            toast({
                title: 'Task added successfull.',
                description: "Task added successfull.",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
            fetchTasks();
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('medium');
            setCompleted('pending');
        } catch (error) {
            console.error("Error adding task:", error);
            toast({
                title: `${error}`,
                description: `${error}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
        }
    };

    const updateTask = async (id, updatedField) => {
        try {
            await axios.patch(`https://uprio-hb32.onrender.com/task/updateTask/${id}`, updatedField, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            toast({
                title: 'Task updated successfull.',
                description: ` Task updated successfull.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
            toast({
                title: `${error}`,
                description: `${error}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`https://uprio-hb32.onrender.com/task/deleteTask/${id}`, {
                headers: { Authorization: localStorage.getItem("token") }
            });

            toast({
                title: 'Task delete successfull.',
                description: ` Task deleted successfull.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
            toast({
                title: `${error}`,
                description: `${error}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
        }
    };

    const filteredTasks = tasks
        .filter(task => filterStatus === 'all' || task.completed === filterStatus)
        .sort((a, b) => {
            switch (sortBy) {
                case 'priority':
                    return a.priority.localeCompare(b.priority);
                case 'dueDate':
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'completed':
                    return a.completed.localeCompare(b.completed);
                default:
                    return 0;
            }
        });

    useEffect(() => {
        fetchTasks();
    }, []);

    return (

        <div className=" todo-background container mx-auto p-4 ">
            <h1 className="text-4xl font-bold mb-6 text-center">Todo App</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3">
                    <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Add New Task</h2>
                    <label className=" mb-2 font-medium text-gray-700">Task Title</label>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="border p-2 w-full mb-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className=" mb-2 font-medium text-gray-700">Task Description</label>

                    <textarea
                        placeholder="Task Description"
                        className="border p-2 w-full mb-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className=" mb-2 font-medium text-gray-700">Due Date :</label>
                    <input
                        type="date"
                        className="border p-2 w-full mb-2 rounded"
                        value={dueDate}
                        placeholder='Add date'
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <label className=" mb-2 font-medium text-gray-700">Priority</label>

                    <select
                        className="border p-2 w-full mb-2 rounded"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >

                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <label className="mb-2 font-medium text-gray-700">Status</label>

                    <select
                        className="border p-2 w-full mb-2 rounded"
                        value={completed}
                        onChange={(e) => setCompleted(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                    </select>
                    <button
                        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>


                <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-2/3">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Tasks</h2>
                    <div className="flex justify-start gap-4 mb-6">
                        <select
                            className="border p-2 rounded"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Tasks</option>
                            <option value="pending">Pending</option>
                            <option value="complete">Completed</option>
                        </select>
                        <select
                            className="border p-2 rounded"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="none">Sort By</option>
                            <option value="priority">Priority</option>
                            <option value="dueDate">Due Date</option>
                            <option value="completed">Completion Status</option>
                        </select>
                    </div>


                    {filteredTasks.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 border-b bg-gray-100 text-left">Sr.No.</th>
                                    <th className="py-2 border-b bg-gray-100 text-left">Title</th>
                                    <th className="py-2 border-b bg-gray-100 text-left">Description</th>
                                    <th className="py-2 border-b bg-gray-100 text-left">Due Date</th>
                                    <th className="py-2 border-b bg-gray-100 text-left">Priority</th>
                                    <th className="py-2 border-b bg-gray-100 text-left">Status</th>
                                    <th className="py-2 border-b bg-gray-100 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task, index) => (
                                    <tr key={task._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">{task.title}</td>
                                        <td className="py-2 px-4 border-b">{task.description}</td>
                                        <td className="py-2 px-4 border-b">
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <select
                                                value={task.priority}
                                                onChange={(e) => updateTask(task._id, { priority: e.target.value })}
                                                className="border p-1 rounded"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <select
                                                value={task.completed}
                                                onChange={(e) => updateTask(task._id, { completed: e.target.value })}
                                                className="border p-1 rounded"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="complete">Complete</option>
                                            </select>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                onClick={() => deleteTask(task._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center">No tasks available. Add a new task.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
