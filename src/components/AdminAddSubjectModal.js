import { useEffect, useState, useRef } from 'react';
import './AdminAddSubjectModal.css'
import AdminDropdownComponent from './AdminDropdownComponent';
import useSelectAll from '../hooks/useSelectAll';
import supabase from '../config/supabaseClient';

const coursesTable = "courses"
const professorsTable = "professors"
const formsTable = "evaluations"

const AdminAddSubjectModal = ({toggleAddSubjectPanel, refresh}) => {

  const [courseDropdown, setCourseDropdown] = useState(false)
  const [professorDropdown, setProfessorDropdown] = useState(false)
  const [formDropdown, setFormDropdown] = useState(false)

  const [course, setCourse] = useState(null);
  const [professor, setProfessor] = useState(null)
  const [form, setForm] = useState(null)

  const [unfilteredCourses, setCourses] = useState(null);
  const [unfilteredProfessors, setProfessors] = useState(null)
  const [unfilteredForms, setForms] = useState(null)

  const unfilteredCoursesData = useSelectAll(coursesTable);
  const unfilteredProfessorsData = useSelectAll(professorsTable);
  const unfilteredFormsData = useSelectAll(formsTable);

  const courseStyle = {top: '160px'}
  const professorsStyle = {top: '220px'}
  const formsStyle = {top: '280px'}

  const inputRef = useRef(null);
  const [subjectCode, setSubjectCode] = useState('');

  const toggleCourseDropdown = () => {

    setCourseDropdown(!courseDropdown)
    setProfessorDropdown(false)
    setFormDropdown(false)

  }
  const toggleProfessorDropdown = () => {

    setProfessorDropdown(!professorDropdown)
    setCourseDropdown(false)
    setFormDropdown(false)

  }
  const toggleFormDropdown = () => {

    setFormDropdown(!formDropdown)
    setCourseDropdown(false)
    setProfessorDropdown(false)

  }

  

  useEffect(() => {
    const fetchData = async () => {
      const courses = await unfilteredCoursesData;
      setCourses(courses);
    };
  
    fetchData();
  }, [unfilteredCoursesData]);

  useEffect(() => {
    const fetchData = async () => {
      const professors = await unfilteredProfessorsData;
      setProfessors(professors);
    };
  
    fetchData();
  }, [unfilteredProfessorsData]);

  useEffect(() => {
    const fetchData = async () => {
      const forms = await unfilteredFormsData;
      setForms(forms);
    };
  
    fetchData();
  }, [unfilteredFormsData]);

  const courses = unfilteredCourses && unfilteredCourses.map((course) => ({
    id: course.course_id,
    name: course.course_name,
  }));

  const professors = unfilteredProfessors && unfilteredProfessors.map((professor) => ({
    id: professor.professor_id,
    name: professor.first_name + ' ' + professor.last_name,
  }));

  const forms = unfilteredForms && unfilteredForms.map((form) => ({
    id: form.evaluation_id,
    name: form.evaluation_title,
  }));

  

  useEffect(() => {
    if (inputRef.current) {
      setSubjectCode(inputRef.current.value);
    }
    console.log("Subject", subjectCode)
  }, [subjectCode]);

  const [subject, setSubject] = useState(null)

  useEffect(() => {
    setSubject({
      subject_name: subjectCode && subjectCode,
      course_id: course && course.id,
      professor_id: professor && professor.id,
      evaluation_id: form && form.id,
    });
  }, [subjectCode, course, professor, form]);

  const handleAddSubject = async () => {

    if(!subjectCode || subjectCode.length <= 6 || !course || !professor || !form) {
      window.alert("Please fill out all fields.");
      return;
    }

    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)

      if (error) {
        console.log("Error inserting subject", error.message)
      } else {
        console.log("Success inserting subject", data)
        window.alert("Subject successfully added!")
        toggleAddSubjectPanel()
        refresh()
      }

  }

  return (
    <div className="admin-add-subject-modal-container">
      <div className="admin-add-subject-modal">
        <div className="admin-add-subject-modal-contai">
          <div className="admin-add-subject-modal-layout">
            <div className="admin-add-subject-modal-title-">
              <div className="admin-professor-first-name-lab">Add Subject</div>
            </div>
            <div className="admin-add-subject-modal-name-c">
              <div className="admin-add-subject-modal-name-l">
                <div className="admin-professor-first-name-lab">
                  Subject Code:
                </div>
                <input
                  className="admin-add-subject-modal-name-i"
                  placeholder="CSPL101 (min. of 7 characters)"
                  type="text"
                  ref={inputRef}
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                />
              </div>
            </div>
            <div className="admin-add-subject-modal-course">
              <div className="admin-add-subject-modal-name-l">
                <div className="admin-professor-first-name-lab">
                  Set Course:
                </div>
                <div className="admin-add-subject-modal-form-d" onClick={toggleCourseDropdown}>
                  <div className="admin-add-subject-modal-form-t" >
                    <div className="admin-add-subject-modal-course5">
                      <button className="admin-add-subject-modal-course6">
                      {course ? course.name : 'Select Course'}
                      </button>
                    </div>
                  </div>
                  <img
                    className="admin-add-subject-modal-course-icon"
                    alt=""
                  src={require('../img/admin-add-subject-modal-course-dropdown-arrow-container.svg').default}
                  />
                </div>
              </div>
            </div>
            { courseDropdown && (<AdminDropdownComponent items = {courses} style = {courseStyle} setItem = {setCourse} closeDropdown = {toggleCourseDropdown} />)}
            <div className="admin-add-subject-modal-course">
              <div className="admin-add-subject-modal-name-l">
                <div className="admin-professor-first-name-lab">
                  Set Professor:
                </div>
                <div className="admin-add-subject-modal-form-d" onClick={toggleProfessorDropdown}>
                  <div className="admin-add-subject-modal-form-t">
                    <div className="admin-add-subject-modal-course5">
                      <button className="admin-add-subject-modal-course6">
                      {professor ? professor.name : 'Select Professor'}
                      </button>
                    </div>
                  </div>
                  <img
                    className="admin-add-subject-modal-course-icon"
                    alt=""
                    src={require('../img/admin-add-subject-modal-course-dropdown-arrow-container.svg').default}
                  />
                </div>
              </div>
            </div>
            { professorDropdown && (<AdminDropdownComponent items = {professors} style = {professorsStyle} setItem = {setProfessor} closeDropdown = {toggleProfessorDropdown}  />)}
            <div className="admin-add-subject-modal-course">
              <div className="admin-add-subject-modal-name-l">
                <div className="admin-professor-first-name-lab">Set Form:</div>
                <div className="admin-add-subject-modal-form-d" onClick={toggleFormDropdown}>
                  <div className="admin-add-subject-modal-form-t">
                    <div className="admin-add-subject-modal-course5">
                      <button className="admin-add-subject-modal-course6">
                      {form ? form.name : 'Select Form'}
                      </button>
                    </div>
                  </div>
                  <img
                    className="admin-add-subject-modal-course-icon"
                    alt=""
                    src={require('../img/admin-add-subject-modal-course-dropdown-arrow-container.svg').default}
                  />
                </div>
              </div>
            </div>
            { formDropdown && (<AdminDropdownComponent items = {forms} style = {formsStyle} setItem = {setForm} closeDropdown = {toggleFormDropdown} /> )}
            <div className="admin-add-subject-modal-save-c">
              <button className="admin-add-subject-modal-cancel" onClick = {toggleAddSubjectPanel} >
                <div className="admin-add-subject-modal-cancel1">Cancel</div>
              </button>
              <button className="admin-professor-save-button" onClick = {() => {handleAddSubject()}} >
                <div className="admin-add-subject-modal-save-b1">
                  Save Changes
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddSubjectModal