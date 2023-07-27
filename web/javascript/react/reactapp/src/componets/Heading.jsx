import React from 'react';

function Heading() {
    const d = new Date();
    let time = d.getHours();

    let greeting = "";

    const customStyle = {
        color: "red"
    }

    if (time < 12) {
        greeting = "Good morning";
        customStyle.color = "red";
    } else if (time >= 12 && time < 18) {
        greeting = "Good Afternoon";
        customStyle.color = "green";
    } else {
        greeting = "Good evening";
        customStyle.color = "blue";
    }

    return (
        <h1 className="heading" style={customStyle}>{greeting}</h1>
    )
}

export default Heading;
