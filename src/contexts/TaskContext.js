import { createContext, useContext, useEffect, useReducer} from "react";
import {data} from "../data/data";
import { TaskReducer } from "../reducers/TaskReducer";
const TaskContext = createContext();

const TaskProvider = ({children}) => {
    const [taskState, taskDispatch] = useReducer(TaskReducer, {tasks:[]});
    useEffect(() => {
        taskDispatch({type: "SET_TASKS", payload: data});
    }, []);
    
    return (
        <TaskContext.Provider value={{taskState, taskDispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

const useTask = () => useContext(TaskContext);

export {TaskProvider, useTask};