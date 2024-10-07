import React from 'react';
import axios from 'axios';

const TodoComponent = ({ todo, onUpdate, onSelect }) => {

  const handleFlagClick = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:3000/todo/${todo.id}`, updatedTodo);
      onUpdate(updatedTodo); 
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleSelect = () => {
    onSelect(todo);
  }

  return (
    <div className="todo-item">
        <span onClick={handleSelect} style={{cursor: 'pointer'}}>{todo.title}</span>
        <span
        onClick={handleFlagClick}
        style={{
            cursor: 'pointer',
            marginLeft: '10px',
            color: todo.completed ? 'green' : 'black',
            fontSize: '1.2em',
        }}
        >
        {todo.completed ? '✔️' : '🏳️'}
      </span>
    </div>
  );
};

export default TodoComponent;
