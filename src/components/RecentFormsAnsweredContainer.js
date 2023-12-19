import "./RecentFormsAnsweredContainer.css";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const RecentFormsAnsweredContainer = ({handleLogout, student}) => {

  const [responses, setResponses] = useState([])

  useEffect(() => {

    const getResponses = async () => {
      try {
        const { data, error } = await supabase
        .from('responses')
        .select(
          `*, subjects(subject_name), professors(first_name, last_name)`
        )
        .eq('student_id', student && student.student_id)

        if(error) {
          console.log("Error fetching responses in Recent Forms: ", error.message)
          setResponses(null)
        } else {
          setResponses(data)
        }

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
  
    };

    if (student) {
      getResponses();
    }

      
  }, [student])
  
  useEffect(() => {
    console.log("Studentasdfasdsdssf", responses)
  }, [responses])

  return (
    <div className="category-section">
      <div className="student-number">Recent Forms Answered</div>
      {responses && responses.map((response) => (
        <button className="evaluation-title-" key={response.response_id}>
          <div className="cspl101">{response.subjects.subject_name && response.subjects.subject_name}</div>
        </button>
      ))}
        
      <div className="settings-icon-container" >
        <img className="settings-icon" src={require('../img/admin-logout-logo-white.svg').default} onClick = {handleLogout}  />
      </div>
    </div>
  );
};

export default RecentFormsAnsweredContainer;
