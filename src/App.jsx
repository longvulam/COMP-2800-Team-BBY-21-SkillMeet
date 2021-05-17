import './App.css';
import CountData, { CountContext } from './CountData';
import Counter from './CounterView';
import CounterViewWithContext from './CounterViewWithContext';


function App() {
    return (
        <div className="App">
            <div>This is an example how to use mobx, check the source code for local and global store with React.useContext()</div>

            <Counter />

            <CountContext.Provider value={CountData}>
                <CounterViewWithContext />
            </CountContext.Provider>
        </div>
    );
}

export default App;
