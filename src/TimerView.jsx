import { observer  } from 'mobx-react-lite';
import {useContext} from "react"
import TimerContext from './Counter';


const TimerView = () => {
    // Grab the timer from the context.
    const timer = useContext(TimerContext);
    return (
        <span>Seconds passed: {timer.secondsPassed}</span>
    )
};

export default TimerView;