import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';

function App() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Note
                    title="this is a title"
                    content="this is some content"
                />
                <Note
                    title="this is a title"
                    content="this is some content"
                />
                <Note
                    title="this is a title"
                    content="this is some content"
                />
                <Note
                    title="this is a title"
                    content="this is some content"
                />
                <Note
                    title="this is a title"
                    content="this is some content"
                />
                <Note
                    title="this is a title"
                    content="this is some content"
                />
                <Note
                    title="this is a title"
                    content="this is some content"
                />
            </div>
            <Footer />
        </div>
    )
}

export default App;
