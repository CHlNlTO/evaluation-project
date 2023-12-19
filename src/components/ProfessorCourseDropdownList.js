import "./ProfessorCourseDropdownList.css";
import ProfessorCourseComponent from "./ProfessorCourseComponent"

const ProfessorCourseDropdownList = ({studComp, studentComponent, toggleCourseDropdown, toggleEvaluationForm}) => {
  return (
  <div className="professor-course-dropdown-list-2" onMouseLeave={toggleCourseDropdown}>
    {studentComponent && studentComponent.map(studentComp => (studentComp.professor_id === studComp.professor_id ? (<ProfessorCourseComponent studentComp = {studentComp} toggleCourseDropdown = {toggleCourseDropdown} toggleEvaluationForm = {toggleEvaluationForm} />) : (<></>) ))}
  </div>
    
  );
};

export default ProfessorCourseDropdownList;
