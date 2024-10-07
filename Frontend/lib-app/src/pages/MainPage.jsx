import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSideBar';
import SelectedList from '../components/SelectedList';
import '../styles/MainPage.css';
import { decodeToken } from 'react-jwt';

const MainPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  const handleSelectTodoList = (todoList) => {
    setSelectedList(todoList); 
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const decodedToken = decodeToken(token);
      const userId = decodedToken.sub;
      setUserId(userId);
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
    getUserIdFromToken(token);
  }, [token]);

  return (
    <div className="main-page">
      <div className={`main-content ${isSidebarVisible ? 'with-sidebar' : 'without-sidebar'}`}>
        <LeftSidebar
          isVisible={isSidebarVisible}
          userId={userId}
          onSelectTodoList={handleSelectTodoList} 
        />
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        {selectedList ? (
          <SelectedList todoList={selectedList} />
        ) : (
            <p>No todo list selected. Select a todo list from the sidebar to view its tasks.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;