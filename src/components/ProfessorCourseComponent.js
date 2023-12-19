import "./ProfessorCourseComponent.css";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

const ProfessorCourseComponent = ({studentComp, toggleCourseDropdown, toggleEvaluationForm}) => {

  const [response, setResponse] = useState(null)

  const setEvaluationForm = async () => {


    const { data, error } = await supabase
      .from('responses')
      .select()
      .eq('subject_id', studentComp.subject_id)
      .eq('student_id', studentComp.student_id);

    if (error) {
      console.log ("Error fetching responses: ", error.message)
    }

    setResponse(data[0])
    console.log(data)
    if (data.length === 0) {
       toggleEvaluationForm(studentComp);
    }

  }

  useEffect(() => {
    if ( response ) {
      window.alert("You've already responded on this form.")
    }
  }, [response])

  const toggleBlockAccess = () => {
      
    }


  return (
    <div className="professor-course-component" onClick = {() => {setEvaluationForm()}} >
      <div className="professor-course-dropdown-list-">
        <div className="professor-course-dropdown-list-1">{studentComp.subject_name}</div>
      </div>
    </div>
  );
};

export default ProfessorCourseComponent;
