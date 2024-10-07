import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewTaskForm.css';

const NewTaskForm = ({ todoListId, onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        long_description: '',
        end_date: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:3000/todo`, {
                ...formData,
                todolist_id: todoListId,
            });
            onTaskAdded(response.data);
            setFormData({ title: '', long_description: '' }); // Clear form fields
        } catch (err) {
            setError('Failed to add the task. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="new-task-form">
            <h3>Add New Task</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Task Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="date">Due Date:</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default NewTaskForm;
