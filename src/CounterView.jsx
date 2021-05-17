import { observer } from "mobx-react-lite";
import { observable } from "mobx";

const countData = observable({
    count: 0
});

const counter = () => {
    return (
        <div>
            <div>Counter without context:</div>
            <button onClick={() => countData.count++}>Increment</button>
            <p>{countData.count}</p>
        </div>
    )
}

export default observer(counter);