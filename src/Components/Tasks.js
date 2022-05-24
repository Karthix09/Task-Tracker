// import React, {useState} from 'react'
import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {

    // const tasks = param.tasks

    return (
        <>
        {tasks.map((task) => (<Task key={task.id} task={task} 
        onDelete={onDelete}
        onToggle={onToggle}/>))}
        </>
    )
}

export default Tasks