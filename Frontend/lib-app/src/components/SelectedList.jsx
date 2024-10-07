import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from '../components/NewTask';
import '../styles/SelectedList.css';

const SelectedList = ({ todoList }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos/${todoList.id}`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (todoList) {
      fetchTodos();
    }
  }, [todoList]);

  const handleFlagClick = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo);
      setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  const toggleCompletedVisibility = () => {
    setShowCompleted(prev => !prev);
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="selected-list">
      <h2>{todoList.name}</h2>

      <NewTaskForm todoListId={todoList.id} onTaskAdded={handleTaskAdded} />

      <div className="task-container">
        <div className="task-section">
          <h3>All Tasks</h3>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.title}
                <span
                  onClick={() => handleFlagClick(todo)}
                  style={{
                    cursor: 'pointer',
                    marginLeft: '10px',
                    color: todo.completed ? 'green' : 'black',
                    fontSize: '1.2em',
                  }}
                >
                  {todo.completed ? '✔️' : '🏳️'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="task-section">
          <button onClick={toggleCompletedVisibility}>
            {showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
          </button>

          {showCompleted && (
            <>
              <h3>Completed Tasks</h3>
              <ul>
                {todos.filter(todo => todo.completed).length > 0 ? (
                  todos.filter(todo => todo.completed).map(todo => (
                    <li key={todo.id}>
                      {todo.title}
                      <span
                        onClick={() => handleFlagClick(todo)}
                        style={{
                          cursor: 'pointer',
                          marginLeft: '10px',
                          color: 'green',
                          fontSize: '1.2em',
                        }}
                      >
                        ✔️
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No completed tasks.</li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedList;
