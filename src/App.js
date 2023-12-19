import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
  const [professorDetails, setProfessorDetails] = useState(null)
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const sessionFlagRef = useRef(false);
  const location = useLocation();
  const [flag, setFlag] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true);

  };

  const handleLogout = () => {
    window.localStorage.removeItem('roleId')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('flag')
    setUser(null)
    setRoleId(null)
    setFlag(false)
    setIsLoggedIn(false)
    navigate('/')
  }

  useEffect(() => {

    const storedRole = window.localStorage.getItem('roleId')
    const storedUser = window.localStorage.getItem('user')
    const storedFlag = window.localStorage.getItem('flag')
    
    if (storedRole !== null || storedUser !== null || storedFlag !== false) {
      setRoleId(JSON.parse(storedRole))
      setUser(JSON.parse(storedUser))
      setFlag(JSON.parse(storedFlag))
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      if (!user && !sessionFlagRef.current) {
        if (location.pathname !== '/') {
          window.alert("Session timed out. Login again.");
          navigate('/');
          sessionFlagRef.current = true;
        }
      }
    }

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          if (roleId === 1) {
            console.log("User: ", user);
            await getAdmin();
          } else {
            await getStudent();
          }
          
          window.localStorage.setItem("roleId", JSON.stringify(roleId))
          window.localStorage.setItem("user", JSON.stringify(user))
          window.localStorage.setItem("flag", JSON.stringify(flag))
          
          navigate(flag === true ? '/UserEvaluationPage' : roleId === 1 ? '/AdminMainPage' : roleId === 2 ? '/UserMainPage' : '/');
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
        console.log("Failed to fetch. Slow Internet", error.message)
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

  const toggleEvaluationForm = (profDetails) => {
    
    setProfessorDetails(profDetails);
    setFlag(true)
    window.localStorage.setItem("student", JSON.stringify(student))
    window.localStorage.setItem("profDetails", JSON.stringify(profDetails))
    window.localStorage.setItem("flag", true)
    navigate('/UserEvaluationPage');

  }

    return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login handleLogin = { handleLogin } roleId = { roleId } setRoleId= { setRoleId } user = { user } setUser= { setUser } />} />
        <Route path="/AdminMainPage" element= {<AdminMainPage admin = {admin} handleLogout={handleLogout} /> }  />
        <Route path="/UserMainPage" element= {<UserMainPage student = {student} toggleEvaluationForm = {toggleEvaluationForm} handleLogout = {handleLogout} />} />
        <Route path="/UserEvaluationPage" element= {<UserEvaluationPage student = {student} professorDetails = {professorDetails} setStudent = {setStudent} setProfessorDetails = {setProfessorDetails} />} />
      </Routes>
    </div>
  );
}
    

export default App;