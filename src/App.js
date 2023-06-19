import React, { useReducer, useState } from 'react';

const initialState = {
  tasks: [],
};

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };
    case REMOVE_TASK:
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TOGGLE_TASK:
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTask, setNewTask] = useState();

  const handleAddTask = () => {
    if (newTask) {
      const task = {
        id: new Date().getTime(),
        name: newTask,
        completed: false,
      };
      dispatch({ type: ADD_TASK, payload: task });
      setNewTask('');
    }
  };

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  const handleRemoveTask = (taskId) => {
    dispatch({ type: REMOVE_TASK, payload: taskId });
  };

  const handleToggleTask = (taskId) => {
    dispatch({ type: TOGGLE_TASK, payload: taskId });
  };

  return (
    <div>
      <h1>Zarządzanie Zadaniami</h1>
      <input value={newTask} onChange={handleInputChange} />
      <button onClick={handleAddTask}>Dodaj zadanie</button>
      <ul style={{ listStyle: 'none' }}>
        {state.tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.name}
            <button onClick={() => handleRemoveTask(task.id)}>
              Usuń zadanie
            </button>
            <button onClick={() => handleToggleTask(task.id)}>
              {!task.completed
                ? 'Oznacz jako zrobione'
                : 'Oznacz jako niezrobione'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
