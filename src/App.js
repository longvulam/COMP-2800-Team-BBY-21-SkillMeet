// import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className = "landing-page-background">
        <Home />
        <Form />
      </div>
    </div>
  );
}

export default App;
