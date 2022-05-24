// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import Header from  './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
 
function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, updateTasks] = useState([]);

  useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        updateTasks(tasksFromServer)
      }

    getTasks()
  }, [])

  //Fetch Tasks

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    //console.log(data)
    return data;

  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    //console.log(data)
    return data;
  }

const addTask = async(task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  updateTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // console.log(task);
  // console.log(id);
  // const newTask = {id, ...task} 
  // updateTasks([...tasks, newTask])
}


//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE',})  

  updateTasks(tasks.filter((task) => task.id !== id)) 
  console.log('delete', id);
}
//Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, { method:'PUT',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(updTask)
})

  const data = await res.json()

  updateTasks(tasks.map((task) => task.id === id ? {...task, reminder: 
   data.reminder } : task))

}
  // let x = 23;
  return (
    <div className='Container'>
      <Header onPress={() => setShowAddTask(!showAddTask)} showPress={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} 
      onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks'}
    </div>
  )
}

//alert('Task Tracker')

export default App
