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
import supabase from './config/supabaseClient';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [roleId, setRoleId] = useState(0)
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [student, setStudent] = useState(null)
  const [department, setDepartment] = useState(null)
  const navigate = useNavigate()

  const handleLogin = (role) => {
    setIsLoggedIn(true);

  };

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          let userData;
          if (roleId === 1) {
            console.log("User: ", user);
            userData = await getAdmin();
          } else {
            userData = await getStudent();
          }
          
          console.log("Student:sasdf, ", student);
          
          navigate(roleId === 1 ? '/AdminMainPage' : '/UserMainPage');
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
    };
  
    fetchData();
  }, [isLoggedIn, roleId, user]);

  const getAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select("admin_id, user_id, username, first_name, last_name", { exclude: ['password'] })
        .eq('user_id', user)

      if (error) {
        console.log("Fetch Error: ", error)
      }

      if (data && data.length > 0) {
        setAdmin(data[0]);
        console.log(admin);
      } else {
        console.log("Admin not set.", data);
      }
    } catch (error) {
      console.error('Catch Error:', error.message);
    }
  };

  const getStudent = async () => {
    try {

      const { data, error } = await supabase
      .from('students')
        .select(
          `
          *,
          courses(course_id, course_name, departments(department_id, department_title))
          `
        )
      .eq('user_id', user);

      console.log("Fetched Data: ", data)

      if (error) {
        console.log("Fetch Error: ", error)
        throw error;
      }

      setStudent(data[0]);
      console.log("Set Student", student);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

  };

    return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login handleLogin = { handleLogin } roleId = { roleId } setRoleId= { setRoleId } user = { user } setUser= { setUser } />} />
        <Route path="/AdminMainPage" element= {<AdminMainPage admin = {admin} /> }  />
        <Route path="/UserMainPage" element= {<UserMainPage student = {student} />} />
        <Route path="/UserEvaluationPage" element= {<UserEvaluationPage />} />
      </Routes>
    </div>
  );
}
    

export default App;