import React from 'react';
import './App.css'; // Ensure this imports the CSS file with Tailwind directives
import Home from './components/Home';

const App = () => {
    return (
        <div className='p-8'>
            <Home />
        </div>
    );
};

export default App;