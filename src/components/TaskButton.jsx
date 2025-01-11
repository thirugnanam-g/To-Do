import React from 'react'

const TaskButton = ({ onClick, children, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-500 hover:bg-blue-600',
        green: 'bg-green-500 hover:bg-green-600',
        yellow: 'bg-yellow-500 hover:bg-yellow-600',
        red: 'bg-red-500 hover:bg-red-600',
        purple: 'bg-purple-500 hover:bg-purple-600',
    };

    return (
        <button
            onClick={onClick}
            className={`p-2 text-white rounded-lg transition-colors ${colorClasses[color]}`}
        >
            {children}
        </button>
    );
};

export default TaskButton