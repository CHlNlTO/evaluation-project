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
