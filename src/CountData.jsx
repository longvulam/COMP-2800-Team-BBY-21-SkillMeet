import { observable } from "mobx";
import { createContext } from "react";

export default observable({
    count: 0
});

export const CountContext = createContext();
