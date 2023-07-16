import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const fName = 'Inderpreet';
const lName = 'Bhatti';
const luckyNumber = '2';


root.render(
    <div>
    <h1>Hello</h1>
    </div>
);
// root.render(<h1>Hello World!</h1>)

// L 1

// ReactDOM.render(
//     <div>
//         <h1>Fruits</h1>
//         <ul>
//             <li>Apple</li>
//             <li>Banana</li>
//             <li>Orange</li>
//         </ul>
//     </div>,
//     document.getElementById('root'));


// L 2
// ReactDOM.render(
//     <div>
//         <h1>Hello {fName} {lName}</h1>
//         <h1>Your Lucky number is</h1>
//         <p>{luckyNumber}</p>
//     </div>,
//     document.getElementById('root')
// )

// reportWebVitals();
