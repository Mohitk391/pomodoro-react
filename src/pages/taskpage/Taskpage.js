import { Link, useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import {useTask} from "../../contexts/TaskContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Taskpage.css";
import { useEffect, useState } from "react";

const Taskpage = () => {
    const {taskState} = useTask();
    const [isPlaying, setIsPlaying] = useState(true);
    const [key,setKey] = useState(0);
    const params = useParams();
    const task = taskState.tasks.find(current=> current.id===params.id);
    const [titleTimer, setTitleTimer] = useState("");

    useEffect(() => {
        document.title = titleTimer + " | Pomodoro"
    }, [titleTimer]);
    

    const restartTimer = ()=> {
        setIsPlaying(false);
        setKey(prev=>prev+1)
    }

    return (
        <div className="page-layout">
        <NavBar />
        <div className="task-main flex flex-column flex-gap-2">
            <div className="task-body">
                <div className="task-actions flex flex-column flex-gap-2">
                    <div className="task-timer flex flex-center">
                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        strokeWidth={12}
                        key={key}
                        duration={parseInt(task.time)}
                        colors={'var(--primary-color)'}>
                        {({remainingTime}) => {
                            const minutes = Math.floor(remainingTime / 60);
                            const seconds = remainingTime % 60;
                            setTitleTimer(`${minutes}:${seconds}`)
                            return (
                            <div className="countdown-timer">
                                {minutes}m : {seconds}s
                            </div>
                            );
                        }}
                        </CountdownCircleTimer>
                    </div>
                    <div className="task-action-buttons flex  flex-column flex-gap-1">
                        { !isPlaying ? <button className="btn primary-action"onClick={()=>setIsPlaying(true)}><i className="fa-solid fa-play" ></i> Start</button> :
                        <button className="btn secondary-action"onClick={()=>setIsPlaying(false)}><i className="fa-solid fa-square"></i> Pause</button>}
                        <button className="btn btn-outline-round tertiary-action" onClick={()=>restartTimer()}><i className="fa-solid fa-arrow-rotate-left"></i> Restart</button>
                    </div>
                </div>
                <div className="task-details flex flex-column flex-gap-2">
                    <div className="task-info flex flex-column flex-gap-1">
                        <div className="redirectToTodo">
                            <Link to="/todo">
                                <button className="btn btn-outline-primary redirect-btn">
                                <i className="fa-solid fa-arrow-left-long"></i> TODO
                                </button>
                            </Link>
                        </div>
                        <div className="task-title">{task.name}</div>
                        <div className="task-description">{task.description}</div>
                    </div>
                    <div className="tags">
                        <h3>Tags:</h3>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export { Taskpage }