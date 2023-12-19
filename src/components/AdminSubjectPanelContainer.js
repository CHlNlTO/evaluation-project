
import AdminSubjectListContainer from "./AdminSubjectListContainer";
import "./AdminSubjectPanelContainer.css";
import { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient";


const AdminSubjectPanelContainer = ({ subjectPanel, subjects, setSubjects, toggleSubjectBody, refreshSubjects, refresh, toggleAddSubjectPanel, subject, setSubject, toggleEditSubjectPanel}) => {

  const [fade, setFade] = useState(false);

  useEffect(() => {

    setFade(!fade);

  }, [subjectPanel]);

  // Fetch Evaluations
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchSubjects = async () => {
        const { data, error } = await supabase
        .from('subjects')
        .select('*, professors(professor_id, first_name, last_name), courses(course_id, course_name, department_id), evaluations(evaluation_title)')
        .order("subject_id", { ascending: true })

        if (error) {    
            setFetchError('No data found.')
            setSubjects(null)
            console.log(error)
        }
        if (data) {
          console.log(data)

          const flattenedSubjects = data && data.map(subject => ({
            subject_id: subject.subject_id,
            subject_name: subject.subject_name,
            course_id: subject.course_id,
            course_name: subject.courses.course_name,
            department_id: subject.courses.department_id,
            evaluation_id: subject.evaluation_id,
            evaluation_title: subject.evaluations.evaluation_title,
            professor_id: subject.professor_id,
            professor_name: subject.professors.first_name + ' ' + subject.professors.last_name,
          })) 

          setSubjects(flattenedSubjects)
          setFetchError(null)
        }
    }

    fetchSubjects()
  }, [refreshSubjects])
  // Fetch Subjects End

  useEffect(() => {

    console.log("Subjects", subjects)

  }, [subjects]);

  const [searchQuery, setSearchQuery] = useState();

  const filteredSubjects = searchQuery ? subjects && subjects.filter(subj =>
    subj.subject_name && subj.subject_name.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
  ) : subjects;

  return (
    <div className={` ${fade ? 'admin-create-form-panel-contai active' : 'admin-create-form-panel-contai inactive'}` }>
      <div className="admin-create-form-panel-title-">
        <button className="admin-create-form-panel-title">
          Manage Subjects
        </button>
      </div>
      <div className="admin-create-form-panel-button">
        <button className="admin-create-form-panel-add-bu" onClick = {toggleAddSubjectPanel}>
          <div className="admin-create-form-panel-add-bu1">
            <img
              className="admin-create-form-panel-add-bu-icon"
              alt=""
              src={require('../img/admin-create-form-panel-add-button-logo.svg').default }
            />
            <div className="admin-create-form-panel-add-bu2">
              Add Subject
            </div>
          </div>
        </button>
        <div className="admin-create-form-panel-search">
          <div className="admin-create-form-panel-search1">
            <img
              className="admin-create-form-panel-add-bu-icon"
              alt=""
              src={require('../img/admin-create-form-panel-form-search-bar-logo.svg').default }
            />
            <input
              className="admin-create-form-panel-search2"
              placeholder="Search Subject"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="admin-create-form-panel-forms-">
        <div className="admin-create-form-panel-forms-1">
          <div className="admin-create-form-panel-forms-2">Subjects ({filteredSubjects && filteredSubjects.length})
          </div>
        </div>
        <div className="admin-create-form-panel-evaluation-list-container">
          {fetchError && (<p>{fetchError}</p>)}
          {filteredSubjects && (
            <div className="admin-create-form-panel-evalua3">
              {filteredSubjects.map(subj => (
                <AdminSubjectListContainer
                  key={subj.subject_id}
                  subj = {subj}
                  setSubject = {setSubject}
                  toggleSubjectBody = {toggleSubjectBody}
                  refresh={refresh}
                  toggleEditSubjectPanel={toggleEditSubjectPanel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminSubjectPanelContainer;
