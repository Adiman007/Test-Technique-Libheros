import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSideBar';
import '../styles/MainPage.css';
import { decodeToken } from "react-jwt";

const MainPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
            const decodedToken = decodeToken(token);
            const userId = decodedToken.sub; 
            setUserId(userId);
            return userId;} 
    catch (error) {
        console.error('Error decoding token:', error);
        return null;
    };
};
useEffect(() => {
  setToken(localStorage.getItem('jwt'))
  getUserIdFromToken(token);
}, [token]);


  return (
    <div className="main-page">
      <div className={`main-content ${isSidebarVisible ? 'with-sidebar' : 'without-sidebar'}`}>
      <LeftSidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} userId={userId}/>
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <h1>Main Content</h1>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default MainPage;