import React, { useState } from 'react';
import Modal from './Modal';

const TodoListComponent = ({ todoList, onDelete, onSelect }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true); 
  };

  const handleConfirmDelete = () => {
    onDelete(todoList.id); 
    setShowModal(false); 
  };

  return (
    <div className="todo-list-item">
      <span onClick={() => onSelect(todoList)}>{todoList.name}</span>
      <button onClick={handleDeleteClick}>Delete</button>

      {showModal && (
        <Modal
          title="Confirm Deletion"
          message={`Are you sure you want to delete this list? All associated tasks will be deleted.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TodoListComponent;
