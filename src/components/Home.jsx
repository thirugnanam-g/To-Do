import React, { useState } from 'react';

const Home = () => {
    const [value, setValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            setTasks([...tasks, value]);
            setValue("");
        }
    };

    // Task movement functions
    const moveToOngoing = (task) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
        setOngoing((prevOngoing) => [...prevOngoing, task]);
    };

    const moveToCompleted = (task) => {
        setOngoing((prevOngoing) => prevOngoing.filter((t) => t !== task));
        setCompleted((prevCompleted) => [...prevCompleted, task]);
    };

    const moveBackToTodo = (task) => {
        setOngoing((prevOngoing) => prevOngoing.filter((t) => t !== task));
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const moveBackToOngoing = (task) => {
        setCompleted((prevCompleted) => prevCompleted.filter((t) => t !== task));
        setOngoing((prevOngoing) => [...prevOngoing, task]);
    };

    const moveBackToCompleted = (task) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
        setCompleted((prevCompleted) => [...prevCompleted, task]);
    };

    // Delete a task from a specific list
    const deleteTask = (task, list, setList) => {
        setList((prevList) => prevList.filter((t) => t !== task));
    };

    // Clear all tasks from a specific list
    const clearAllTasks = (setList) => {
        setList([]);
    };

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            {/* Header */}
            <div className='text-center mb-10'>
                <h1 className='text-4xl font-bold text-blue-600'>To-Do App</h1>
                <p className='text-gray-600'>Organize your tasks efficiently</p>
            </div>

            {/* Add Task Form */}
            <div className='flex justify-center mb-10'>
                <form onSubmit={handleSubmit} className='flex gap-4 w-full max-w-md'>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={value}
                        placeholder='Enter a new task'
                        className='flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        type='submit'
                        className='p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                    >
                        Add Task
                    </button>
                </form>
            </div>

            {/* Task Sections */}
            <div className='flex flex-col lg:flex-row gap-6'>
                {/* TO-DO Task Section */}
                <div className='flex-1 bg-white rounded-lg shadow-lg'>
                    <div className='bg-blue-500 p-4 rounded-t-lg'>
                        <h1 className='text-xl font-semibold text-white'>TO-DO Tasks</h1>
                    </div>
                    <div className='p-4'>
                        <button
                            onClick={() => clearAllTasks(setTasks)}
                            className='w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4'
                        >
                            Clear All
                        </button>
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index} className='mb-4 p-4 bg-gray-50 rounded-lg shadow-sm'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-lg text-gray-700'>{task}</span>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => moveToOngoing(task)}
                                                className='p-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                                            >
                                                Move To Ongoing
                                            </button>
                                            <button
                                                onClick={() => moveBackToCompleted(task)}
                                                className='p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'
                                            >
                                                Move to Completed
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task, tasks, setTasks)}
                                                className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Ongoing Tasks Section */}
                <div className='flex-1 bg-white rounded-lg shadow-lg'>
                    <div className='bg-yellow-500 p-4 rounded-t-lg'>
                        <h1 className='text-xl font-semibold text-white'>Ongoing Tasks</h1>
                    </div>
                    <div className='p-4'>
                        <button
                            onClick={() => clearAllTasks(setOngoing)}
                            className='w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4'
                        >
                            Clear All
                        </button>
                        <ul>
                            {ongoing.map((task, index) => (
                                <li key={index} className='mb-4 p-4 bg-gray-50 rounded-lg shadow-sm'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-lg text-gray-700'>{task}</span>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => moveToCompleted(task)}
                                                className='p-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                                            >
                                                Move To Completed
                                            </button>
                                            <button
                                                onClick={() => moveBackToTodo(task)}
                                                className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                                            >
                                                Move Back to TO-DO
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task, ongoing, setOngoing)}
                                                className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Completed Tasks Section */}
                <div className='flex-1 bg-white rounded-lg shadow-lg'>
                    <div className='bg-green-500 p-4 rounded-t-lg'>
                        <h1 className='text-xl font-semibold text-white'>Completed Tasks</h1>
                    </div>
                    <div className='p-4'>
                        <button
                            onClick={() => clearAllTasks(setCompleted)}
                            className='w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4'
                        >
                            Clear All
                        </button>
                        <ul>
                            {completed.map((task, index) => (
                                <li key={index} className='mb-4 p-4 bg-gray-50 rounded-lg shadow-sm'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-lg text-gray-700'>{task}</span>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => moveBackToOngoing(task)}
                                                className='p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'
                                            >
                                                Move Back to Ongoing
                                            </button>
                                            <button
                                                onClick={() => moveBackToTodo(task)}
                                                className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                                            >
                                                Move Back to TO-DO
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task, completed, setCompleted)}
                                                className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;