<<<<<<< HEAD
import "../css/UserMainPage.css";
import ProfessorCardComponent from "../components/ProfessorCard";
import UserSidePanel from "../components/UserSidePanel";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

const UserMainPage = ({student, toggleEvaluationForm, handleLogout}) => {

  const [studentDetails, setStudentDetails] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [professors, setProfessors] = useState(null)

  useEffect(() => {

    const getStudentDetails = async () => {
      try {
  
        const { data, error } = await supabase
        .from('subjects')
        .select(
          `*, courses(course_name), subject_name, professors(first_name, last_name), evaluations(evaluation_title) `
        )
        .eq('course_id', student.course_id)
  
        console.log("Fetched Data: ", data)
  
        if (error) {
          console.log("Fetch Error: ", error)
          setFetchError('No data found.')
          setStudentDetails(null)
          throw error;
        } else {
          setStudentDetails(data);
          setFetchError(null)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
  
    };

    if (student) {
      getStudentDetails();
    }
      
  }, [student])

  const [studentComponent, setStudentComponent] = useState(null)

  useEffect(() => {
    if (student && studentDetails) {
      const flattenedStudentDetails = studentDetails.map((studentDetail) => ({
        student_id: student.student_id,
        subject_id: studentDetail.subject_id,
        subject_name: studentDetail.subject_name,
        course_id: studentDetail.course_id,
        course_name: studentDetail.courses.course_name,
        professor_id: studentDetail.professor_id,
        professor_name: studentDetail.professors.first_name + ' ' + studentDetail.professors.last_name,
        evaluation_id: studentDetail.evaluation_id,
        evaluation_title: studentDetail.evaluations.evaluation_title,
      }));
  
      setStudentComponent(flattenedStudentDetails.length > 0 ? flattenedStudentDetails : null);
    }
  }, [student, studentDetails]);

  useEffect(() => {
    console.log("Student Component: ", studentComponent)
  }, [studentComponent])

  const uniqueProfessorIds = new Set();

  return (
    <div className="user-main-page">
      <UserSidePanel student = {student} handleLogout = {handleLogout} />
      <main className="body-container" id="main">
        <div className="navbar-container">
          <div className="navbar-title-container">
            <button className="navbar-title">EVALUATION FORMS</button>
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
              
              {studentComponent && (
                <> 
                  {studentComponent.map((studComp) => {
                    const professorId = studComp.professor_id;

                    if (professorId && !uniqueProfessorIds.has(professorId)) {
                      uniqueProfessorIds.add(professorId);

                      return <ProfessorCardComponent key={professorId} studComp = {studComp} studentComponent = {studentComponent} toggleEvaluationForm = {toggleEvaluationForm} />;
                    }

                    return null;
                  })}
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
=======
import "../css/UserMainPage.css";
import ProfessorCardComponent from "../components/ProfessorCard";

const UserMainPage = () => {
  return (
    <div className="user-main-page">
      <div className="user-side-panel-1"></div>
      <div className="user-side-panel">
        <div className="user-details-section">
          <div className="profile-container" />
          <div className="user-name">Clark Wayne Abutal</div>
          <div className="student-number">S2021100408</div>
          <div className="student-number">BSCS-3A</div>
        </div>
        <div className="category-section-container">
          <div className="category-section">
            <div className="student-number">Recent Forms Answered</div>
            <button className="evaluation-title-">
              <ul className="cspl101">CSPL101</ul>
            </button>
            <div className="settings-icon-container">
              <button className="settings-icon" />
            </div>
          </div>
        </div>
      </div>
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
                COLLEGE OF COMPUTING AND INFORMATION TECHNOLOGY
              </b>
            </section>
            <section className="professor-list-container">
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
            </section>
          </main>
        </section>
      </main>
    </div>
  );
};

export default UserMainPage;
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86
