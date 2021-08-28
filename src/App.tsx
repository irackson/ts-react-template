import React from 'react';
// import { FC } from 'react';
import Main from 'components/Main';
import 'App.css';

function App() {
    return (
        <div className="App">
            <Main foo={5} bar={'Hello World'}></Main>
        </div>
    );
}

export default App;
