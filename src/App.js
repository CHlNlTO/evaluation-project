import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

// Design
import './css/App.css';

// Pages
import Login from "./pages/Login";
import AdminMainPage from "./pages/AdminMainPage"
import UserMainPage from "./pages/UserMainPage";
import UserEvaluationPage from "./pages/UserEvaluationPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleId, setRoleId] = useState(0);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setIsLoggedIn(true);

  };

  useEffect(() => {
    if (isLoggedIn) {
      if (roleId === 1) {
        navigate('/AdminMainPage');
      } else {
        navigate('/UserMainPage');
      }
    }
  }, [isLoggedIn, roleId]);

    return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login handleLogin = { handleLogin } roleId = { roleId } setRoleId= { setRoleId } user = { user } setUser= { setUser } />} />
        <Route path="/AdminMainPage" element= {<AdminMainPage />} />
        <Route path="/UserMainPage" element= {<UserMainPage />} />
        <Route path="/UserEvaluationPage" element= {<UserEvaluationPage />} />
      </Routes>
    </div>
  );
}
    

export default App;