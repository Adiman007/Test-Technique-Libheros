import React, { useState, useEffect } from 'react';
import '../styles/LeftSidebar.css';
import axios from 'axios';
import TodoListComponent from './TodoListComponent';

const LeftSidebar = ({ isVisible, userId, onSelectTodoList }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodoList = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:3000/todolist/${userId}`);
        setTodoLists(response.data);
      } catch (error) {
        console.error('Error fetching the todo list:', error);
      }
    };

    fetchTodoList();
  }, [userId]);

  const handleAddTodoList = async () => {
    if (newTodoName.trim() === '') {
      alert("Todolist name can't be blank");
      return;
    }
    if (todoLists.some(list => list.name === newTodoName)) {
      alert('This todo list name is already taken. Please choose a different name.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:3000/todolist`, {
        name: newTodoName,
        user_id: userId,
      });
      setTodoLists([...todoLists, response.data]);
      setNewTodoName('');
    } catch (error) {
      console.error('Error adding new todo list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodoList = async (todoListId) => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${todoListId}`);
      setTodoLists(todoLists.filter(list => list.id !== todoListId));
    } catch (error) {
      console.error('Error deleting todo list:', error);
    }
  };

  const handleSelectTodoList = (todoList) => {
    onSelectTodoList(todoList); // Pass selected list up to MainPage
  };

  return (
    <div className={`left-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      {isVisible && (
        <div>
          <h2>TodoLists</h2>
          <div className="white-container">
          <ul>
            {todoLists.length > 0 ? (
              todoLists.map((list) => (
                <TodoListComponent
                  key={list.id}
                  todoList={list}
                  onDelete={handleDeleteTodoList}
                  onSelect={() => handleSelectTodoList(list)} // Handle selection
                />
              ))
            ) : (
              <li>No tasks available</li>
            )}
          </ul>

          <div className="add-todo">
            <input
              type="text"
              placeholder="New todo list name"
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
            />
            <button onClick={handleAddTodoList} disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Todo List'}
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
