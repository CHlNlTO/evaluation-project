<<<<<<< HEAD
import "../css/ProfessorCardComponent.css";
import { useState, useEffect, useRef } from 'react'
import ProfessorCourseComponent from "./ProfessorCourseComponent"
import ProfessorCourseDropdownList from "./ProfessorCourseDropdownList"

const CDNURL = "https://zcbchgefophtjpqajxiq.supabase.co/storage/v1/object/public/Evaluation-Project-Bucket/"

const ProfessorCardComponent = ({studComp, studentComponent, toggleEvaluationForm}) => {

    const [courseDropdown, setCourseDropdown] = useState(false)
    const dropdownRef = useRef(null);

    const toggleCourseDropdown = () => {
        setCourseDropdown(!courseDropdown)
        console.log("Course Dropdown: ", courseDropdown);
    }

    useEffect(() => {
        const closeDropdown = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setCourseDropdown(false);
          }
        };
    
        window.addEventListener('click', closeDropdown);
    
        return () => {
          window.removeEventListener('click', closeDropdown);
        };
      }, []);

  return (
    <div className="professor-card-component" >
        <div className="courses-container" onClick = {toggleCourseDropdown}>
            <div className="course-dropdown">
                <b className="student-number">Courses</b>
                <button className="dropdown-arrow" />
            </div>
        </div>
        <div className="professor-details-outer-contai">
            <div className="professor-details-middle-conta">
                <img
                  className="professor-details-inner-contai-icon" 
                  src={CDNURL + `professor_image${studComp.professor_id}`}
                />
            </div>
        </div>
        <div className="professor-name-container">
            <b className="professor-name1">{studComp.professor_name}</b>
        </div>
        {courseDropdown && (<ProfessorCourseDropdownList studComp = {studComp} studentComponent = {studentComponent} toggleCourseDropdown={toggleCourseDropdown} toggleEvaluationForm = {toggleEvaluationForm} />)}
    </div>
  );
};

export default ProfessorCardComponent;
=======
import "../css/ProfessorCardComponent.css";

const ProfessorCardComponent = () => {
  return (
    <div className="professor-card-component">
        <div className="courses-container">
            <div className="course-dropdown">
                <b className="student-number">Courses</b>
                <button className="dropdown-arrow" />
            </div>
        </div>
        <div className="professor-details-outer-contai">
            <div className="professor-details-middle-conta">
                <img
                className="professor-details-inner-contai-icon" src="/img/professor_image.png"
                />
            </div>
        </div>
        <div className="professor-name-container">
            <b className="professor-name1">Bryan Briones</b>
        </div>
    </div>
  );
};

export default ProfessorCardComponent;
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86
