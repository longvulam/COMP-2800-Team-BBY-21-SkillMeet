import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { CountContext } from "./CountData";


const counter = observer(() => {
    const countData = useContext(CountContext);
    return (
        <div>
            <div>Counter with context:</div>
            <button onClick={() => countData.count++}>Increment</button>
            <p>{countData.count}</p>
        </div>
    )
})

export default counter;