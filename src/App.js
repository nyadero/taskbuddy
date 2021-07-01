import React, { useEffect, useState } from 'react';
import './App.css';
import Tasks from './Tasks';
import Alert from './Alert';

const getlocalStorage = () => {
  let task = localStorage.getItem("tasks");
  if (task) {
    return (task = JSON.parse(localStorage.getItem("tasks")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState(getlocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg:'', type: '' });

  // form submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      // send an alert
      showAlert(true, 'please enter a task', 'danger');
    } else if (name && isEditing) {
      // deal with bedit
      setTasks(tasks.map((task) => {
        if (task.id === editID) {
          return { title: name, ...tasks }
        }
        return task;
      }));
      setIsEditing(false);
      setName('');
      setEditID(null);
      showAlert(true, 'task updated', 'success' );
    } else {
      // send an Alert
      showAlert(true, 'new task added', 'success');
      const newTask = { id: new Date().getTime().toString(), title: name };
      setTasks([newTask, ...tasks]);
      setName('');
    }
  };

  // alert
  const showAlert = (show = false, msg= '', type ='') => {
    setAlert({ show, msg, type });
  };
  // delete all items
  const clearItems = () => {
    showAlert(true, 'items cleared', 'danger')
    setTasks([]);
  };
  //  delete single item by id
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    showAlert(true, 'task deleted', 'danger');
  };

  // edit a task
  const editTask = (id) => {
    const editedTask = tasks.find((task) => task.id === id);
    setName(editedTask.title);
    setIsEditing(true);
    setEditID(id);
  };

  // localstorage
 useEffect(() => {
   window.localStorage.setItem("tasks", JSON.stringify(tasks));
 }, [tasks]);

  return (
    <section>
      <div className="header">
        <h2>Task Buddy</h2>
      </div>
      <div className="section-center">
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="e.g. clean my room"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        <div className="task-length">
          <div className="alert-box">{alert.show && <Alert {...alert} removeALert = {showAlert} tasks={tasks} />} </div>
          <h3>
            {tasks.length > 0
              ? `You have ${tasks.length} tasks today` : `You have no task today`}
          </h3>
        </div>
        {tasks.length > 0 && (
          <div className="tasks">
            <Tasks items={ tasks } deleteTask={ deleteTask } editTask={ editTask} />
            <button onClick={clearItems} className="clear-btn">
              clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
