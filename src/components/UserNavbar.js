import "../css/UserNavbar.css";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const UserNavbar = ({addNavbarDropdownComponent, setAddNavbarDropdownComponent, dropdownRef, student}) => {

  const navigate = useNavigate()

  const toggleHome = () => {

    window.localStorage.removeItem('flag')
    navigate('/UserMainPage')

  }
=======
const UserNavbar = ({addNavbarDropdownComponent, setAddNavbarDropdownComponent, dropdownRef}) => {
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86

    return (
    <nav className="user-navbar" ref={dropdownRef}>
      <div className="user-student-details-container">
        <button className="user-student-name">{student && student.first_name + " " + student &&  student.last_name}</button>
        <div className="user-separator" />
        <button className="user-student-number">{student && student.student_number}</button>
      </div>
      <div className="user-navbar-list-container">
        <div className="user-navbar-list-title-contain">
<<<<<<< HEAD
          <a href= "./UserMainPage" onClick = {toggleHome}>
=======
          <img
            className="user-hamburger-menu-icon"
            alt=""
            src="../img/hamburger-menu1.svg" onClick={() => setAddNavbarDropdownComponent(!addNavbarDropdownComponent)}
          />
          <a href= "/">
            <button className="user-navbar-profs">Profs</button>
          </a>
          <a href= "./Admin">
            <button className="user-navbar-courses">Courses</button>
          </a>
          <a href= "./UserMainPage">
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86
            <button className="user-navbar-home">Home</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
