import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Change to false

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}></Route>
        <Route path="/main" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}></Route>
      </Routes>
    </Router>
  );
};

export default App;