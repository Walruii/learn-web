import React from 'react';

function Note(props) {
    return (
        <div className="note">
            <p className="note-title">{props.title}</p>
            <p className="note-content">{props.content}</p>
        </div>
    );
}

export default Note;
