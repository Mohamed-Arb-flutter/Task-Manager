import { useState , useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(()=>{
    const Saved=localStorage.getItem("tasks");
    if(Saved)
    {
      return JSON.parse(Saved)
    }
    else {return []}
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
 useEffect(()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks))
 },[tasks])
  function handleAddTask() {
    if (!inputValue.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  function deleteTask(id) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }
    if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="app-title">Task Manager</h1>

        <div className="input-group">
          <input
            type="text"
            className="task-input"
            placeholder="Enter your task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTask();
            }}
          />
          <button className="add-btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

        <div className="filter-group">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <span
                className={`task-text ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;