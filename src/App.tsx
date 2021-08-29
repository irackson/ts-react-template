import Main from 'components/Main';
import 'App.scss';

function App() {
    return (
        <div className="App">
            <Main foo={5} bar={'Hello World'}></Main>
        </div>
    );
}

export default App;
