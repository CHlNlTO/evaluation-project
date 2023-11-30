import "./RegisterCourseDropdownList.css";
import RegisterCourseComponent from "./RegisterCourseComponent"

const RegisterCourseDropdownList = ({courses, setCourse, toggleCourseDropdown}) => {
  return (
  <div className="register-course-dropdown-list-2">
    {courses && courses.map(course => (<RegisterCourseComponent course={course} setCourse={setCourse} toggleCourseDropdown = {toggleCourseDropdown} />))}
  </div>
    
  );
};

export default RegisterCourseDropdownList;
