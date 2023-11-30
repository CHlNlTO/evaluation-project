import "../css/UserMainPage.css";
import ProfessorCardComponent from "../components/ProfessorCard";
import UserSidePanel from "../components/UserSidePanel";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

const UserMainPage = ({student}) => {

  const [professors, setProfessors] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {

    const getProfessors = async () => {
      try {
  
        const { data, error } = await supabase
        .from('enrollees')
        .select(
          `enrollee_id,
          subjects(subject_id, subject_name, professors(professor_id, first_name, last_name), evaluations(evaluation_id, evaluation_title))
          `
        )
        .eq('student_id', 1)
  
        console.log("Fetched Data: ", data)
  
        if (error) {
          console.log("Fetch Error: ", error)
          setFetchError('No data found.')
          setProfessors(null)
          throw error;
        }
  
        setProfessors(data);
        setFetchError(null)
        console.log("Set Professors: ", professors);
  
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
  
    };

    if (student) {
      getProfessors();
    }
      
  }, [student])

  

  return (
    <div className="user-main-page">
      <UserSidePanel student = {student} />
      <main className="body-container" id="main">
        <div className="navbar-container">
          <div className="navbar-list-container">
            <img
              className="hamburger-menu-icon" src="/img/hamburger_menu.png" alt="menu"/>
            <button className="navbar-profs">Profs</button>
            <button className="navbar-courses">Courses</button>
            <button className="navbar-home">{`Home          `}</button>
          </div>
          <div className="navbar-title-container">
            <button className="navbar-title">EVALUATION FORM</button>
          </div>
        </div>
        <section className="body-inner-container" id="professors_cotainer">
          <main className="body-container1">
            <section className="college-deparment-container">
              <b className="college-department">
                {student && student.courses.departments.department_title.toUpperCase()}
              </b>
            </section>
            <section className="professor-list-container">
              {fetchError && (<p>{fetchError}</p>)}
              
              {professors && (
                <> 
                  {professors.map(professor => (
                      <ProfessorCardComponent professor = {professor} />
                  ))}
                </>
              )}
            </section>
          </main>
        </section>
      </main>
    </div>
  );
};

export default UserMainPage;
