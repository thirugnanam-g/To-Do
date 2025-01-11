import React, { useState } from 'react';
import TaskButton from './TaskButton';
import TaskSection from "./TaskSection";


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

    const moveToCompletedFromTodo = (task) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
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
                    <TaskButton type='submit' color='blue'>
                        Add Task
                    </TaskButton>
                </form>
            </div>

            {/* Task Sections */}
            <div className='flex flex-col lg:flex-row gap-6'>
                {/* TO-DO Task Section */}
                <TaskSection
                    title="TO-DO Tasks"
                    tasks={tasks}
                    onMoveToOngoing={moveToOngoing}
                    onMoveToCompletedFromTodo={moveToCompletedFromTodo} // Pass the new function
                    onDeleteTask={(task) => deleteTask(task, tasks, setTasks)}
                    onClearAll={() => clearAllTasks(setTasks)}
                    bgColor="bg-blue-500"
                    sectionType="todo"
                />

                {/* Ongoing Tasks Section */}
                <TaskSection
                    title="Ongoing Tasks"
                    tasks={ongoing}
                    onMoveToCompleted={moveToCompleted}
                    onMoveBackToTodo={moveBackToTodo}
                    onDeleteTask={(task) => deleteTask(task, ongoing, setOngoing)}
                    onClearAll={() => clearAllTasks(setOngoing)}
                    bgColor="bg-yellow-500"
                    sectionType="ongoing"
                />

                {/* Completed Tasks Section */}
                <TaskSection
                    title="Completed Tasks"
                    tasks={completed}
                    onMoveBackToOngoing={moveBackToOngoing}
                    onMoveBackToTodo={moveBackToTodo}
                    onDeleteTask={(task) => deleteTask(task, completed, setCompleted)}
                    onClearAll={() => clearAllTasks(setCompleted)}
                    bgColor="bg-green-500"
                    sectionType="completed"
                />
            </div>
        </div>
    );
};

export default Home;