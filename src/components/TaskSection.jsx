import React from 'react';
import TaskButton from './TaskButton';

const TaskSection = ({
    title,
    tasks,
    onMoveToOngoing,
    onMoveToCompleted,
    onMoveToCompletedFromTodo, // New prop for moving from TO-DO to Completed
    onMoveBackToTodo,
    onMoveBackToOngoing,
    onDeleteTask,
    onClearAll,
    bgColor,
    sectionType,
}) => {
    return (
        <div className='flex-1 bg-white rounded-lg shadow-lg'>
            <div className={`${bgColor} p-4 rounded-t-lg`}>
                <h1 className='text-xl font-semibold text-white'>{title}</h1>
            </div>
            <div className='p-4'>
                <button
                    onClick={onClearAll}
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
                                    {/* Show "Move To Ongoing" button for TO-DO section */}
                                    {sectionType === 'todo' && (
                                        <TaskButton
                                            onClick={() => onMoveToOngoing(task)}
                                            color='green'
                                        >
                                            Move To Ongoing
                                        </TaskButton>
                                    )}

                                    {/* Show "Move To Completed" button for TO-DO section */}
                                    {sectionType === 'todo' && (
                                        <TaskButton
                                            onClick={() => onMoveToCompletedFromTodo(task)}
                                            color='yellow'
                                        >
                                            Move To Completed
                                        </TaskButton>
                                    )}

                                    {/* Show "Move To Completed" button for Ongoing section */}
                                    {sectionType === 'ongoing' && (
                                        <TaskButton
                                            onClick={() => onMoveToCompleted(task)}
                                            color='yellow'
                                        >
                                            Move To Completed
                                        </TaskButton>
                                    )}

                                    {/* Show "Move Back to TO-DO" button for Ongoing and Completed sections */}
                                    {(sectionType === 'ongoing' || sectionType === 'completed') && (
                                        <TaskButton
                                            onClick={() => onMoveBackToTodo(task)}
                                            color='red'
                                        >
                                            Move Back to TO-DO
                                        </TaskButton>
                                    )}

                                    {/* Show "Move Back to Ongoing" button for Completed section */}
                                    {sectionType === 'completed' && (
                                        <TaskButton
                                            onClick={() => onMoveBackToOngoing(task)}
                                            color='purple'
                                        >
                                            Move Back to Ongoing
                                        </TaskButton>
                                    )}

                                    {/* Delete button for all sections */}
                                    <TaskButton
                                        onClick={() => onDeleteTask(task)}
                                        color='red'
                                    >
                                        Delete
                                    </TaskButton>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskSection


