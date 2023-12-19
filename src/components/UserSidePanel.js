import supabase from "../config/supabaseClient";
import RecentFormsAnsweredContainer from "./RecentFormsAnsweredContainer";
import "./UserSidePanel.css";

const UserSidePanel = ({student, handleLogout}) => {


  return (
    <div className="user-side-panel1">
      <div className="user-details-section1">
        <div className="profile-container1" />
        <div className="user-name1">{student && student.first_name + " " + student.last_name}</div>
        <div className="student-number1">{student && student.student_number}</div>
        <div className="student-number1">{student && student.courses.course_name}</div>
      </div>
      <div className="category-section-container1">
        <RecentFormsAnsweredContainer handleLogout = {handleLogout} student = {student}/>
      </div>
    </div>
  );
};

export default UserSidePanel;
