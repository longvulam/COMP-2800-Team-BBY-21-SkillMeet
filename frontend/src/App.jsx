import logo from './logo.svg';
import './App.css';
import db from './dbConn/db'

function fetchCallExample() {
    fetch("/fetchExampleApi")
        .then(async response => console.log(await response.json()));
};

function App() {
    // fetchCallExample();

    return (
        <div className="App">
            <header className="App-header">
                <div>Add your page components here,</div>
                <div>we'll merge them later.</div>
            </header>
        </div>
    );
}

export default App;
