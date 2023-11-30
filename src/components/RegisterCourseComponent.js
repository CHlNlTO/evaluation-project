import "./RegisterCourseComponent.css";

const RegisterCourseComponent = ({course, setCourse, toggleCourseDropdown}) => {

  const toggleCourse = () => {

    setCourse(course);
    toggleCourseDropdown();

  }

  return (
    <div className="register-course-component" onClick = {toggleCourse} >
      <div className="register-course-dropdown-list-">
        <div className="register-course-dropdown-list-1">{course.course_name}</div>
      </div>
    </div>
  );
};

export default RegisterCourseComponent;
