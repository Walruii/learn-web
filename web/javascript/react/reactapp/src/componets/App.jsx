import React from 'react';
import Heading from './Heading';
import {add, subtract, multiply, divide} from './calc';

function App() {
    return (
        <div>
            <ul>
                <li>{add(1, 2)}</li>
                <li>{multiply(2, 3)}</li>
                <li>{subtract(7, 2)}</li>
                <li>{divide(5, 2)}</li>
            </ul>
        </div>
    )
}

export default App;
