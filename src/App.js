import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
//import UserMainPage from "./pages/UserMainPage";
import UserEvaluationPage from './pages/UserEvaluationPage';


function App() {
    return (
    <div className="App">
       <UserEvaluationPage />
    </div>
  );
}

<Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Admin" element={<Admin />} />
        {/* <Route path="UserMainPage" element={<UserMainPage />} /> */}
        <Route path="/" element={<UserEvaluationPage />} />
</Routes>

export default App;
