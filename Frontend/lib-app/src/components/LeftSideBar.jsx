import React, { useState, useEffect } from 'react';
import '../styles/LeftSidebar.css';
import axios from 'axios';

const LeftSidebar = ({ isVisible, toggleSidebar, userId }) => {
    const [todoLists, setTodoLists] = useState([]); 
    const [newTodoName, setNewTodoName] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        const fetchTodoList = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`http://localhost:3000/todolist/${userId}`);
                setTodoLists(response.data); // Set fetched todo lists
            } catch (error) {
                console.error('Error fetching the todo list:', error);
            }
        };

        fetchTodoList();
    }, [userId]);

    const handleAddTodoList = async () => {
        if (newTodoName.trim() === '') return; 
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

            // Assuming response.data contains the newly created todo object
            setTodoLists([...todoLists, response.data]); // Append the new todo list from the response
            setNewTodoName(''); // Clear the input field after submission
        } catch (error) {
            console.error('Error adding new todo list:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`left-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
            {isVisible && (
                <div>
                    <h2>Task Lists</h2>

                    {/* Render the todoLists */}
                    <ul>
                        {todoLists.length > 0 ? (
                            todoLists.map((list, index) => (
                                <li key={index}>{list.name}</li>
                            ))
                        ) : (
                            <li>No tasks available</li>
                        )}
                    </ul>

                    {/* Input field and button to add a new todo list */}
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
            )}
        </div>
    );
};

export default LeftSidebar;
