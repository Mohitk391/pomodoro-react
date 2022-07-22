import {v4 as uuid} from "uuid";
import { useState } from "react";
import {NavBar} from "../../components/NavBar/NavBar";
import { useTask } from "../../contexts/TaskContext";
import "./Todo.css";
import { useNavigate } from "react-router-dom";

const Todo = () => {
    const [overlay, toggleOverlay] = useState("hidden");
    const [overlayAction, setOverlayAction] = useState("Create");
    const [taskInputs, setTaskInputs] = useState({name:"", description: "", hours: "", minutes: "", seconds: "", id: ""});
    const {taskState:{tasks}, taskDispatch} = useTask();
    const navigate = useNavigate();

    const createTask = (taskInputs)=>{
        const time = parseInt(taskInputs.seconds) + (parseInt(taskInputs.minutes) * 60) + (parseInt(taskInputs.hours) * 3600);
        const newTask = {name: taskInputs.name, description: taskInputs.description, status: "unfinished", time: time, id: uuid()}
        taskDispatch({type: "ADD_TASK" , payload: newTask});
        resetInputs();
    }

    const toggleUpdateTask = (task) => {
        const time = timeConvert(parseInt(task.time));
        const hrs = time.hours, mins = time.mins, sec = time.sec;
        setTaskInputs({name: task.name, description: task.description, hours: hrs, minutes: mins, seconds: sec,id: task.id});
        toggleOverlay("visible");
        setOverlayAction("Update");
    }

    const updateTask = (taskInputs) => {
        const time = parseInt(taskInputs.seconds) + (parseInt(taskInputs.minutes) * 60) +  (parseInt(taskInputs.hours) * 3600);
        const updatedTask = {name: taskInputs.name, description: taskInputs.description, status: "unfinished", time: time, id: taskInputs.id};
        taskDispatch({type: "UPDATE_TASK", payload: updatedTask});
        resetInputs();
    }

    const deleteTask = (task) => {
        taskDispatch({type: "DELETE_TASK" , payload: task});
    }

    const timeConvert = (time) => {
        var hours = 0, mins = 0, sec = 0;
        while(time>0){
            if(time>=3600){
                hours = Math.floor(time/3600);
                time = time%3600;
            }
            else if(time>=60){
                mins = Math.floor(time/60);
                time =time%60;
            }
            else {

                sec = time;
                time =time%1;
            }
        }
        return {hours, mins, sec};
    }

    const redirectToTask = (task) => {
        taskDispatch({type: "UPDATE_TASK", payload: {...task, status: "finsihed"}});
        navigate(`/task/${task.id}`);
    }

    const resetInputs = () => setTaskInputs({name:"", description: "", hours: "", minutes: "", seconds: ""});

    return (
        <div className="page-layout pos-relative">
        <NavBar />
        <main className="todo-main flex flex-column flex-gap-2">
            <div className="todo-header">
                <h2 className="todo-heading">Welcome User,</h2>
                <div className="todo-header-text">{tasks.length > 0 ? `You have ${tasks.length} tasks for today. All the best!!` : `Click on + to add new task.!!!`}</div>
            </div>
            <div className="todo-body flex flex-column">
                <div className="content-header flex flex-space-between">
                    <h3> To-Do List</h3>
                    <i className="fa fa-circle-plus addToDo" onClick={()=>{toggleOverlay("visible"); setOverlayAction("Create")}}></i>
                </div>
                <div className="content-body flex flex-column flex-gap-1">
                    {
                        tasks.map(task => {
                            return (
                                <div className="todo-task flex flex-space-between">
                                    <p className={`task ${task.status=== 'finished' ? 'finished-task' : 'unfinished-task'}`} onClick={()=>redirectToTask(task)}>
                                        {task.name}
                                    </p>
                                    <div className="todo-actions flex flex-gap-1">
                                        <i className="fa-solid fa-pen-to-square" onClick={()=>toggleUpdateTask(task)}></i>
                                        <i className="fa-solid fa-trash-can" onClick={()=>deleteTask(task)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
        <div className="task-overlay-layer flex flex-center" style={{visibility: overlay}}>
            <div className="todo-task-body flex flex-column ">
                <div className="task-header flex flex-column">
                    <div className="close flex flex-center" onClick={()=>{toggleOverlay("hidden");resetInputs()}}><i className="fa-solid fa-close"></i></div>
                </div>
                <div className="task-contents flex flex-column flex-gap-1">
                    <input id="taskName" type="text" placeholder="Add Name" value={taskInputs.name} onChange={e=>setTaskInputs({...taskInputs, name: e.target.value})}/>
                    <textarea id="taskDescription" type="text" placeholder="Add Description" value={taskInputs.description} onChange={e=>setTaskInputs({...taskInputs, description: e.target.value})}></textarea>
                    <div className="time-input flex">
                        <input id="taskTime" type="number" min={0} placeholder="   hrs" value={taskInputs.hours} onChange={e=>setTaskInputs({...taskInputs, hours: e.target.value})}/>
                        <input id="taskTime" type="number" min={0}  placeholder="   min" value={taskInputs.minutes} onChange={e=>setTaskInputs({...taskInputs, minutes: e.target.value})}/>
                        <input id="taskTime" type="number" min={0}  placeholder="   sec" value={taskInputs.seconds} onChange={e=>setTaskInputs({...taskInputs, seconds: e.target.value})}/>        
                    </div>
                </div>
                <div className="footer-button flex flex-center">
                    <button className="btn btn-hover create-button" onClick={()=>{
                        overlayAction === "Create" ? createTask(taskInputs) : updateTask(taskInputs);
                        toggleOverlay("hidden");
                        }}>
                            {overlayAction}
                            </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export {Todo}