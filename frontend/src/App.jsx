import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';

function fetchCallExample() {
    fetch("/fetchExampleApi")
        .then(async response => console.log(await response.json()));
};

function App() {
    // fetchCallExample();

    return (
        <div className="App">
            <Navbar />
            <Home></Home>
        </div>
    );
}

export default App;
