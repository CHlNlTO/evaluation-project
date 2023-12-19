import supabase from '../config/supabaseClient';
import { useState, useEffect } from 'react';
import AdminCreateFormPanelContai from "../components/AdminCreateFormPanelContai";
import AdminCreateFormQuestionCom from "../components/AdminCreateFormQuestionCom";
import AdminAddFormPanel from "../components/AdminAddFormPanel";
import AdminEditFormPanel from "../components/AdminEditFormPanel";
import AdminProfessorPanelContainer from "../components/AdminProfessorPanelContainer";
import AdminBodyFiller from '../components/AdminBodyFiller';
import AdminStatisticsPanelForm from '../components/AdminStatisticsPanelForm';
import AdminStatisticsContainer from '../components/AdminStatisticsContainer';
import PieChart from '../statistics/PieChart';
import 'chart.js/auto'; 
import { useGenerateId } from '../hooks/useGenerateId';
import "../css/AdminMainPage.css";
import AdminProfessorBodyContainer from '../components/AdminProfessorBodyContainer'
import AdminAddProfPanel from '../components/AdminAddProfPanel';
import AdminSubjectPanelContainer from '../components/AdminSubjectPanelContainer';
import AdminAddSubjectModal from '../components/AdminAddSubjectModal';
import AdminEditSubjectModal from '../components/AdminEditSubjectModal';

const AdminMainPage = ({admin, handleLogout}) => {


  const [addPanel, setAddPanel] = useState(false)
  const [evalPanel, setEvalPanel] = useState(false)
  const [evalBody, setEvalBody] = useState(false)
  const [editFormPanel, setEditFormPanel] = useState(false)
  const [refreshForms, setRefreshForms] = useState(false)
  const [statPanel, setStatPanel] = useState(false)
  const [statBody, setStatBody] = useState(false)
  const [profPanel, setProfPanel] = useState(false)
  const [profBody, setProfBody] = useState(false)
  const [refreshProfs, setRefreshProfs] = useState(false)
  const [addProfPanel, setAddProfPanel] = useState(false)
  const [editProfPanel, setEditProfPanel] = useState(false)
  const [subjectPanel, setSubjectPanel] = useState(false)
  const [subjectBody, setSubjectBody] = useState(false)
  const [addSubjectPanel, setAddSubjectPanel] = useState(false)
  const [editSubjectPanel, setEditSubjectPanel] = useState(false)
  const [refreshSubjects, setRefreshSubject] = useState(false)
  const [blockForm, setBlockForm] = useState(false)

  const [form, setForm] = useState(null)
  const [forms, setForms] = useState(null)
  const [question, setQuestion] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [deletedQuestions, setDeletedQuestions] = useState(null)
  const [updateQuestions, setUpdateQuestions] = useState([])
  const [pieScores, setPieScores] = useState([])
  const [professors, setProfessors] = useState(null)
  const [professor, setProfessor] = useState(null)
  const [subjects, setSubjects] = useState(null)
  const [subject, setSubject] = useState(null)
  const uniqueId = useGenerateId()


  // Toggle Panels Start
    const toggleCreatePanel = () => {
      setAddPanel(!addPanel)
    }

    const toggleEditFormPanel = () => {
      setEditFormPanel(!editFormPanel)
    }

    const toggleAddProfPanel = () => {
      setAddProfPanel(!addProfPanel)
    }

    const toggleEditProfPanel = () => {
      setEditProfPanel(!editProfPanel)
    }
    
    const toggleAddSubjectPanel = () => {
      setAddSubjectPanel(!addSubjectPanel)
    }

    const toggleEditSubjectPanel = () => {
      setEditSubjectPanel(!editSubjectPanel)
    }

    const toggleHome = () => {
      console.log("home")
      if (evalBody === true) {
        setEvalBody(false)
      }
      if (evalPanel === true) {
        setEvalPanel(false)
      }
      if (statBody === true) {
        setStatBody(false)
      }
      if (statPanel === true) {
        setStatPanel(false)
      }
      if (profBody === true) {
        setProfBody(false)
      }
      if (profPanel === true) {
        setProfPanel(false)
      }
      if (subjectBody === true) {
        setSubjectBody(false)
      }
      if (subjectPanel === true) {
        setSubjectPanel(false)
      }
    }

    const toggleEvalPanel = () => {
      setEvalPanel(!evalPanel)
      if (evalBody === true) {
        setEvalBody(false)
      }
      if (statBody === true) {
        setStatBody(false)
      }
      if (statPanel === true) {
        setStatPanel(false)
      }
      if (profBody === true) {
        setProfBody(false)
      }
      if (profPanel === true) {
        setProfPanel(false)
      }
      if (subjectBody === true) {
        setSubjectBody(false)
      }
      if (subjectPanel === true) {
        setSubjectPanel(false)
      }
    }

    const toggleStatPanel = () => {
      setStatPanel(!statPanel)
      if (statBody === true) {
        setStatBody(false)
      }
      if (evalBody === true) {
        setEvalBody(false)
      }
      if (evalPanel === true) {
        setEvalPanel(false)
      }
      if (profBody === true) {
        setProfBody(false)
      }
      if (profPanel === true) {
        setProfPanel(false)
      }
      if (subjectBody === true) {
        setSubjectBody(false)
      }
      if (subjectPanel === true) {
        setSubjectPanel(false)
      }
    }

    const toggleProfPanel = () => {
      setProfPanel(!profPanel)
      if (profBody === true) {
        setProfBody(false)
      }
      if (evalBody === true) {
        setEvalBody(false)
      }
      if (evalPanel === true) {
        setEvalPanel(false)
      }
      if (statBody === true) {
        setStatBody(false)
      }
      if (statPanel === true) {
        setStatPanel(false)
      }
      if (subjectBody === true) {
        setSubjectBody(false)
      }
      if (subjectPanel === true) {
        setSubjectPanel(false)
      }
    }

    const toggleSubjectPanel = () => {
      setSubjectPanel(!subjectPanel)
      if (subjectBody === true) {
        setSubjectBody(false)
      }
      if (evalBody === true) {
        setEvalBody(false)
      }
      if (evalPanel === true) {
        setEvalPanel(false)
      }
      if (statBody === true) {
        setStatBody(false)
      }
      if (statPanel === true) {
        setStatPanel(false)
      }
      if (profBody === true) {
        setProfBody(false)
      }
      if (profPanel === true) {
        setProfPanel(false)
      }
    }

    const toggleEvalBody = () => {
      if (evalBody === false) {
        setEvalBody(true)
      }
    }

    const toggleStatBody = () => {
      if (statBody === false) {
        setStatBody(true)
      }
    }

    const toggleProfBody = () => {
      if (profBody === false) {
        setProfBody(true)
      }
    }

    const toggleSubjectBody = () => {
      if (subjectBody === false) {
        setSubjectBody(true)
      }
    }
    // Toggle Panels End


    // Refresh Forms Start
    const refresh = () => {

      setRefreshForms(!refreshForms);
      setRefreshProfs(!refreshProfs);
      setRefreshSubject(!refreshSubjects)

    }
    // Refresh Forms End

    // Fetch Evaluations
  useEffect(() => {
    const fetchForms = async () => {
        const { data, error } = await supabase
        .from('evaluations')
        .select()
        .order("evaluation_id", { ascending: true })

        if (error) {    
            setFetchError('No evaluation form found.')
            setForms(null)
            console.log(error)
        }
        if (data) {
            console.log(data)
            setForms(data)
            setFetchError(null)
        }
    }

    fetchForms()
  }, [refreshForms])

  useEffect(() => {
    const fetchProfs = async () => {
        const { data, error } = await supabase
        .from('professors')
        .select()
        .order("professor_id", { ascending: true })

        if (error) {    
            setFetchError('No professor found.')
            setProfessors(null)
            console.log(error)
        }
        if (data) {
            console.log(data)
            setProfessors(data)
            setFetchError(null)
        }
    }

    fetchProfs()
  }, [refreshProfs])

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase
      .from('subjects')
      .select('*, professors(professor_id, first_name, last_name), courses(course_id, course_name, department_id)')
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
          professor_id: subject.professor_id,
          professor_name: subject.professors.first_name + ' ' + subject.professors.last_name,
        })) 

        setSubjects(flattenedSubjects)
        setFetchError(null)
      }
  }

    fetchSubjects()
  }, [refreshSubjects])
  // Fetch Evaluations End


    // Fetch Forms Start
    useEffect(() => {

      const toggleFetch = () => {
        console.log(form.evaluation_id)
        fetchQuestions();
      }

      if (form) {
        toggleFetch();
      }      
    }, [form])

    // Fetch Questions Start

    const fetchQuestions = async () => {
      const { data, error } = await supabase
      .from('questions')
      .select()
      .eq("evaluation_id", form && form.evaluation_id)
      .order("question_number")

      if (error) {    
          setFetchError('No data found.')
          setQuestions(null)
          setDeletedQuestions(null)
          console.log(error)
      }
      if (data) {
          console.log(data)
          setQuestions(data)
          setFetchError(null)
      }
    }
    // Fetch Questions End


  const handleQuestionTextChange = (questionNumber, value) => {
    setQuestions((prevQuestions) => 
      prevQuestions.map((question) => 
        question.question_number === questionNumber ? { ...question, question_text: value } : question
      )
    );
  };

  
  // Add Question Start
  const handleAddQuestion = () => {
    if (questions) {

      const newQuestion = {
        question_id: uniqueId,
        admin_id: admin.admin_id,
        question_text: '',
        evaluation_id: form.evaluation_id,
        question_number: questions.length + 1,
      };

      console.log("New Question ID: ", newQuestion.question_id, "\n", "New Question Number: ", newQuestion.question_number);

      setQuestions([...questions, newQuestion]);
    }
  }
  // Add Question End


  // Delete Question Start
  const handleDeleteQuestion = (questionNumber) => {
    if (questionNumber !== undefined || questionNumber !== null) {
      const updatedQuestions = questions.filter(question => question.question_number !== questionNumber);
      console.log("Question Length: ", questions.length)

      const updatedQuestionsWithNumbers = updatedQuestions.map((question, index) => ({
        ...question,
        question_number: index + 1,
      }));

      setQuestions(updatedQuestionsWithNumbers);

      const deletedQuestion = questions.find(question => question.question_number === questionNumber);
      setDeletedQuestions(prevDeletedQuestions => [...(prevDeletedQuestions || []), deletedQuestion]);
    }
  };
  // Delete Question End
  
  

  // Handles Saving Into Database
  const handleConfirmBox = async () => {
    separateQuestions(questions);
    const confirmed = window.confirm('Are you sure you want to proceed?');
    console.log("Update Questions inside confirm: ", updateQuestions);
    if (confirmed) {
      console.log('User confirmed');
      console.log(updateQuestions);
      deletingQuestions();
      fetchQuestions();
    } else {
      console.log('User cancelled');
      console.log("Deleted questions: ", deletedQuestions, "Updated questions: ", questions);
    } 
  }

  const deletingQuestions = async () => {

    if (deletedQuestions || deletedQuestions !== null) {
      const questionIdsToDelete = deletedQuestions
        .filter((question) => question.question_id !== undefined)
        .map((question) => question.question_id);
    
      const { error: errorQuestionsData } = await supabase
        .from("questions")
        .delete()
        .in("question_id", questionIdsToDelete);
        
      if (errorQuestionsData) {
        console.log("Error deleting questions: ", errorQuestionsData.message)
        return;
      }
      console.log("Deleting questions successful.")
    }
      updatingQuestions(questions);
  }

  const updatingQuestions = async (data) => {
    const updatedQuestions = [];
    const insertQuestions = [];
  
    let currentCount = 1;
    
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (!isQuestionTextEmpty(item)) {
          insertQuestions.push(item);
        }
      });
    }

    if (Array.isArray(insertQuestions)) {
      insertQuestions.forEach((item) => {
          item.question_number = currentCount;
          updatedQuestions.push(item);
          currentCount++;
      });
    }
    console.log("Save Updated Questions: ", updatedQuestions);
    const { data: questionsData, error: errorQuestionsData } = await supabase
              .from('questions')
              .upsert(updatedQuestions, { onConflict: ['question_id'] })
              .eq('question_id', questions.question_id)

    if (errorQuestionsData) {
      console.log("Error updating questions: ", errorQuestionsData.message)
      return;
    }
    window.alert('Saved Successfully.');
    setDeletedQuestions(null);
    fetchQuestions();
  }

  const separateQuestions = async (data) => {
    const updatedQuestions = [];
    const insertQuestions = [];
  
    let currentCount = 1;
    
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (!isQuestionTextEmpty(item)) {
          insertQuestions.push(item);
        }
      });
    }

    if (Array.isArray(insertQuestions)) {
      insertQuestions.forEach((item) => {
          item.question_number = currentCount;
          updatedQuestions.push(item);
          currentCount++;
      });
    }

    console.log("Updated Questions: ", updatedQuestions);
    
    setUpdateQuestions((prevUpdateQuestions) => updatedQuestions);
    console.log("Update Questions inside SepQs: ", updateQuestions);
  }

  function isQuestionTextEmpty(question) {
    return !question.question_text.trim();
  }

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .storage
        .from('Evaluation-Project-Bucket')
        .list('/', {
          limit : 100,
          offset : 0,
          sortBy : { column: "name", order: "asc"}
        });

      if (error) {
        console.error('Error fetching images:', error.message);
      } else {
        setImageUrls(data);
        console.log()
        
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls])

  //Redirect Start
  const redirectToSupabase = () => {
    window.location.href = 'https://supabase.com/dashboard/project/zcbchgefophtjpqajxiq/editor';
  }

  const redirectToChatGPT = () => {
    window.location.href = 'https://chat.openai.com';
  }

  return (
    <div className="admin-main-page">
      
      <div className="admin-add-form-panel-void" />
      <div className="admin-side-panel">
        <img
          className="admin-database-logo-icon"
          alt=""
          src={require('../img/admin-database-logo.svg').default } onClick = {toggleHome}
        />
        <img
          className="admin-evaluation-logo-icon"
          alt=""
          src={require('../img/admin-evaluation-logo.svg').default } onClick = {toggleEvalPanel}
        />
        <img
          className="admin-subject-logo-icon"
          alt=""
          src={require('../img/admin-subject-logo.svg').default } onClick= {toggleSubjectPanel}
        />
        <img
          className="admin-professor-logo-icon"
          alt=""
          src={require('../img/admin-professor-logo.svg').default } onClick= {toggleProfPanel}
        />
        <img
          className="admin-statistics-logo-icon"
          alt=""
          src={require('../img/admin-statistics-logo.svg').default } onClick = {toggleStatPanel}
        />
        <img
          className="admin-settings-logo-icon"
          alt=""
          src={require('../img/admin-logout-logo.svg').default } onClick = {handleLogout}
        />
      </div>
      <div className="admin-body-container">
        {evalPanel && <AdminCreateFormPanelContai 
          evalPanel = {evalPanel} 
          toggleCreatePanel = {toggleCreatePanel} 
          setForm = {setForm} 
          toggleEvalBody = {toggleEvalBody} 
          refreshForms={refreshForms}
          refresh={refresh}
          toggleEditFormPanel = {toggleEditFormPanel}
          forms = {forms}
          setForms = {setForms}
        />}
        {statPanel && <AdminStatisticsPanelForm 
          statPanel = {statPanel} 
          forms = {forms}
          fetchQuestions= {fetchQuestions}
          setForm = {setForm} 
          questions = {questions}
          toggleStatBody = {toggleStatBody}
          setQuestion = {setQuestion}
        />}
        {profPanel && <AdminProfessorPanelContainer 
          profPanel = {profPanel}
          professors = {professors}
          setProfessors = {setProfessors}
          toggleProfBody = {toggleProfBody}
          refresh= {refresh}
          refreshProfs = {refreshProfs}
          toggleAddProfPanel= {toggleAddProfPanel}
          professor = {professor}
          setProfessor = {setProfessor}
          toggleEditProfPanel = {toggleEditProfPanel}
        />}
        {subjectPanel && <AdminSubjectPanelContainer 
          subjectPanel = {subjectPanel}
          subjects = {subjects}
          setSubjects = {setSubjects}
          toggleSubjectBody = {toggleSubjectBody}
          refresh= {refresh}
          refreshSubjects = {refreshSubjects}
          toggleAddSubjectPanel= {toggleAddSubjectPanel}
          subject = {subject}
          setSubject = {setSubject}
          toggleEditSubjectPanel = {toggleEditSubjectPanel}
        />}

        <div className="admin-body-main-container">
          <nav className="admin-navbar">
            <div className="admin-navbar-list-container">
              <div className="admin-navbar-list-title-contai">
                <button className="admin-navbar-database" onClick={redirectToSupabase}>Database</button>
                <button className="admin-navbar-help" onClick={redirectToChatGPT}>Help</button>
              </div>
            </div>
            <div className="admin-navbar-details-container">
              <button className="admin-navbar-id">{admin && admin.admin_id}</button>
              <div className="admin-navbar-separator" />
              <button className="admin-navbar-username">{admin && admin.username}</button>
            </div>
          </nav>
          {statBody && (
          <div className="admin-statistics-body-containe">
            <div className="admin-statistics-body-containe">
              <div className="admin-statistics-central-tende">
                <AdminStatisticsContainer 
                  evaluation_id = {(form && form.evaluation_id)} 
                  question_id = {(question && question.question_id)} 
                  setPieScores = {setPieScores}
                  pieScores = {pieScores} />
              </div>
              <div className="admin-statistics-graphs-contai">
                <div className="admin-statistics-graphs-layout">
                  <div className="admin-statistics-pie-chart-con">
                      <PieChart pieScores={pieScores} />
                  </div>
                </div>
              </div>
            </div>
          </div>)}
          
          { !(statBody) && (<div className="admin-body-container1">
            { evalBody && (<div className="admin-body-evaluation-form-tit"> 
              <div className="admin-body-evaluation-form-tit1">
                {form && form.evaluation_title}
              </div>
              <button className="admin-body-evaluation-form-sav" onClick={handleConfirmBox}>
                <div className="admin-body-evaluation-form-sav1">
                  Save Changes
                </div>
              </button>
            </div>
            )}
            { evalBody && (<div className="admin-body-evaluation-form-tab">
              <div className="admin-body-evaluation-form-tab1">
                  <div className="admin-body-evaluation-form-tab2">
                    <div className="admin-body-evaluation-form-tab3">
                      <div className="admin-body-evaluation-form-tab4">
                        Question No.
                      </div>
                    </div>
                  </div>

                  <div className="admin-body-evaluation-form-tab8">
                    <div className="admin-body-evaluation-form-tab9">
                      <div className="admin-body-evaluation-form-tab4">
                        Question Text
                      </div>
                    </div>
                  </div>
                  <img
                    className="admin-body-evaluation-form-tab-icon"
                    alt=""
                    src={require('../img/admin-body-evaluation-form-table-add-question-container.svg').default} onClick = {handleAddQuestion}
                  />
                </div>
                {fetchError && (<p>{fetchError}</p>)}
                {questions && (
                  <div className="admin-body-evaluation-form-tab11"> 
                      {questions.map(question => (
                          <AdminCreateFormQuestionCom 
                            question = {question} 
                            key = {question.question_id} 
                            value = {question.question_text} 
                            handleQuestionTextChange = {handleQuestionTextChange} 
                            handleDeleteQuestion = {handleDeleteQuestion} />
                      ))}
                  </div>
                )}
              </div> 
            )}

            { profBody && (<AdminProfessorBodyContainer professor = {professor} refresh= {refresh} />)}
            { !(evalBody) && !(profBody) && (<AdminBodyFiller toggleCreatePanel = {toggleCreatePanel}/>
            )}
          </div>)}
        </div>
      </div>
      { addPanel && (<AdminAddFormPanel admin = {admin} toggleCreatePanel = {toggleCreatePanel} addPanel = {addPanel} setForm={setForm} refresh={refresh} />)}

      { editFormPanel && (<AdminEditFormPanel admin = {admin} toggleEditFormPanel = {toggleEditFormPanel} editFormPanel = {editFormPanel} setForm={setForm} refresh={refresh} form = {form} />)}
      { addProfPanel && (<AdminAddProfPanel toggleAddProfPanel = {toggleAddProfPanel} refresh= {refresh} />)}

      { addSubjectPanel && (<AdminAddSubjectModal toggleAddSubjectPanel = {toggleAddSubjectPanel} refresh= {refresh} />)}

      { editSubjectPanel && (<AdminEditSubjectModal subj = {subject} toggleEditSubjectPanel = {toggleEditSubjectPanel} refresh= {refresh} />)}
      
    </div>
  );
};

export default AdminMainPage;
