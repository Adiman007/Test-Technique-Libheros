import React, { useState } from 'react';
import '../styles/RightSidebar.css';
import axios from 'axios';

const RightSidebar = ({ selectedTask, onClose, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  if (!selectedTask) return null; 


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todo/${selectedTask.id}`);
      onDelete(selectedTask.id); 
      onClose(); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const confirmDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="right-sidebar">
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {selectedTask.title}</p>
        <p><strong>Description:</strong> {selectedTask.long_description || 'No description provided.'}</p>
        <p><strong>Status:</strong> {selectedTask.completed ? 'Completed' : 'Not completed'}</p>
        <p><strong>Created On:</strong> {selectedTask.creation_date || 'No creation date given'}</p>
        <p><strong>Due Date:</strong> {new Date(selectedTask.end_date).toLocaleDateString()}</p>
        
        <button onClick={confirmDelete} className="delete-task-button">Delete Task</button>
        {showModal && (
            <div className="modal">
            <div className="modal-content">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                <button onClick={handleConfirmDelete} className="confirm-delete-button">Yes, Delete</button>
                <button onClick={handleCancelDelete} className="cancel-button">Cancel</button>
            </div>
            </div>
        )}
    </div>
  );
};

export default RightSidebar;