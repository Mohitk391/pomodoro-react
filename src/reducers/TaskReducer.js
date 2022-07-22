
const TaskReducer = (taskState, action) => {
    switch(action.type){
        case "SET_TASKS" :
            return {...taskState, tasks: action.payload}
        case "ADD_TASK" :
            return {...taskState, tasks: [...taskState.tasks, action.payload]}
        case "DELETE_TASK" :
            return {...taskState, tasks: taskState.tasks.filter(task=>task.id!== action.payload.id)}
        case "UPDATE_TASK":
            return {...taskState, tasks: taskState.tasks.map(task=> (task.id===action.payload.id) ? action.payload : task)}
        default:
            return taskState;
    }
}

export {TaskReducer}