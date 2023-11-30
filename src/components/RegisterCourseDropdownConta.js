import "./RegisterCourseDropdownConta.css";

const RegisterCourseDropdownConta = ({course, toggleCourseDropdown}) => {
  return (
    <div className="register-course-dropdown-conta" onClick={toggleCourseDropdown} onKeyUp={toggleCourseDropdown}>
      <div className="register-course-dropdown-conta1">
        <div className="register-course-dropdown-detai">
          <input placeholder="Select Course" value = {course && course.course_name} className="register-course-dropdown-title" readOnly></input>
          <div className="register-course-dropdown-arrow" />
        </div>
      </div>
    </div>
  );
};

export default RegisterCourseDropdownConta;
