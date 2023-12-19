import "../css/UserNavbar.css";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({addNavbarDropdownComponent, setAddNavbarDropdownComponent, dropdownRef, student}) => {

  const navigate = useNavigate()

  const toggleHome = () => {

    window.localStorage.removeItem('flag')
    navigate('/UserMainPage')

  }

    return (
    <nav className="user-navbar" ref={dropdownRef}>
      <div className="user-student-details-container">
        <button className="user-student-name">{student && student.first_name + " " + student &&  student.last_name}</button>
        <div className="user-separator" />
        <button className="user-student-number">{student && student.student_number}</button>
      </div>
      <div className="user-navbar-list-container">
        <div className="user-navbar-list-title-contain">
          <a href= "./UserMainPage" onClick = {toggleHome}>
            <button className="user-navbar-home">Home</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
