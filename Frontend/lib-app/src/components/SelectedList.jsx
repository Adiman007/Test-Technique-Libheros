import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './NewTask';
import TodoComponent from './TodoComponent';
import RightSidebar from './RightSideBar';
import '../styles/SelectedList.css';

const SelectedList = ({ todoList,Selectedtodo }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

    setSelectedTask(null)
  }, [todoList]);

  const handleTaskAdded = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  const handleTodoUpdate = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const toggleCompletedVisibility = () => {
    setShowCompleted(prev => !prev);
  };
  const onSelect = (todo) => {
    setSelectedTask(todo);
  }
  
  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId)); 
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
          {todos.filter(todo => todos).length > 0 ? (
                  todos.filter(todo => !todo.completed).map(todo => (
                    <li key={todo.id}>
                        <TodoComponent todos ={todos} todo={todo} onUpdate={handleTodoUpdate} onSelect={onSelect}/>
                    </li>
                  ))
                ) : (
                  <li>No tasks for this todolist.</li>
                )}
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
                        <TodoComponent todos ={todos} todo={todo} onUpdate={handleTodoUpdate} onSelect={onSelect}/>
                    </li>
                  ))
                ) : (
                  <li>No completed tasks.</li>
                )}
              </ul>
            </>
          )}
        </div>
        {selectedTask && (<RightSidebar
          selectedTask={selectedTask}
          onClose={() => setSelectedTask(null)} 
          onDelete={handleDeleteTodo} 
        />)}
      </div>
    </div>
  );
};

export default SelectedList;
