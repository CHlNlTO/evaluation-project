import supabase from '../config/supabaseClient';
import { useState, useEffect } from 'react';
import AdminCreateFormPanelContai from "../components/AdminCreateFormPanelContai";
import AdminCreateFormQuestionCom from "../components/AdminCreateFormQuestionCom";
import AdminAddFormPanel from "../components/AdminAddFormPanel";
import AdminEditFormPanel from "../components/AdminEditFormPanel";
import AdminBodyFiller from '../components/AdminBodyFiller';
import { useGenerateId } from '../hooks/useGenerateId';
import "../css/AdminMainPage.css";

const AdminMainPage = ({admin}) => {


  const [addPanel, setAddPanel] = useState(false)
  const [evalPanel, setEvalPanel] = useState(false)
  const [evalBody, setEvalBody] = useState(false)
  const [editFormPanel, setEditFormPanel] = useState(false)
  
  const [form, setForm] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const uniqueId = useGenerateId()
  const [deletedQuestions, setDeletedQuestions] = useState(null)
  const [refreshForms, setRefreshForms] = useState(false);


  // Toggle Panels Start
    const toggleCreatePanel = () => {
      setAddPanel(!addPanel)
    }
    
    const toggleEvalPanel = () => {
      setEvalPanel(!evalPanel)
      if (evalBody === true) {
        setEvalBody(false)
      }
    }
    
    const toggleEvalBody = () => {
      if (evalBody === false) {
        setEvalBody(true)
      }
    }

    const toggleEditFormPanel = () => {
        setEditFormPanel(!editFormPanel)
    }
    // Toggle Panels End


    // Refresh Forms Start
    const refresh = () => {

      setRefreshForms(!refreshForms);

    }
    // Refresh Forms End


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

    useEffect(() => {

      console.log("Questions: ", questions);
      console.log("DeletedQs: ", deletedQuestions);

    }, [questions])
    // Fetch Forms End


    // Fetch Questions Start

    const fetchQuestions = async () => {
      const { data, error } = await supabase
      .from('questions')
      .select()
      .eq("evaluation_id", form.evaluation_id)
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
    const confirmed = window.confirm('Are you sure you want to proceed?');
    separateQuestions(questions);
    if (confirmed) {
      console.log('User confirmed');
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
      updatingQuestions();
  }

  const updatingQuestions = async () => {
    console.log(updateQuestions);
    const { data: questionsData, error: errorQuestionsData } = await supabase
              .from('questions')
              .upsert(updateQuestions, { onConflict: ['question_id'] })
              .eq('question_id', questions.question_id)

    if (errorQuestionsData) {
      console.log("Error updating questions: ", errorQuestionsData.message)
      return;
    }
    console.log("Updating questions successful.", questionsData)
    insertingQuestions();

  }

  const insertingQuestions = async () => {
    console.log(insertQuestions);
    const { data: questionsData, error: errorQuestionsData } = await supabase
              .from('questions')
              .insert(insertQuestions);
  
    if (errorQuestionsData) {
      console.log("Error inserting questions: ", errorQuestionsData.message)
      return;
    }

    setDeletedQuestions(null)
    setQuestions(null)

    console.log("Inserting questions successful.", questionsData)
    window.alert('Saved Successfully.');
    fetchQuestions();
  }

  const {updateQuestions, insertQuestions} = separateQuestions(questions);

  function isQuestionTextEmpty(question) {
    return !question.question_text.trim();
  }

  function separateQuestions(data) {
    const updateQuestions = [];
    const insertQuestions = [];
  
    
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if ('question_id' in item && item.question_id !== undefined) {
          updateQuestions.push(item);
        } else if (!isQuestionTextEmpty(item)) {
          insertQuestions.push(item);
        }
      });
    }

    console.log("Insert Questions: ", insertQuestions);

    return { updateQuestions, insertQuestions };
  }
  
  return (
    <div className="admin-main-page">
      <div className="admin-add-form-panel-void" />
      <div className="admin-side-panel">
        <img
          className="admin-database-logo-icon"
          alt=""
          src={require('../img/admin-database-logo.svg').default }
        />
        <img
          className="admin-home-logo-icon"
          alt=""
          src={require('../img/admin-home-logo.svg').default }
        />
        <img
          className="admin-evaluation-logo-icon"
          alt=""
          src={require('../img/admin-evaluation-logo.svg').default } onClick = {toggleEvalPanel}
        />
        <img
          className="admin-professor-logo-icon"
          alt=""
          src={require('../img/admin-professor-logo.svg').default }
        />
        <img
          className="admin-settings-logo-icon"
          alt=""
          src={require('../img/admin-settings-logo.svg').default }
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
        />}
        <div className="admin-body-main-container">
          <nav className="admin-navbar">
            <div className="admin-navbar-list-container">
              <div className="admin-navbar-list-title-contai">
                <button className="admin-navbar-database">Database</button>
                <button className="admin-navbar-about">About</button>
                <div className="frame">
                  <img
                    className="admin-hamburger-menu-icon"
                    alt=""
                    src={require('../img/hamburger-menu1.svg').default }
                  />
                </div>
                <button className="admin-navbar-help">Help</button>
              </div>
            </div>
            <div className="admin-navbar-details-container">
              <button className="admin-navbar-id">{admin && admin.admin_id}</button>
              <div className="admin-navbar-separator" />
              <button className="admin-navbar-username">{admin && admin.username}</button>
            </div>
          </nav>
          <div className="admin-body-container1">
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
            { !evalBody && (<AdminBodyFiller toggleCreatePanel = {toggleCreatePanel}/>
            )}
          </div>
        </div>
      </div>
      { addPanel && (<AdminAddFormPanel admin = {admin} toggleCreatePanel = {toggleCreatePanel} addPanel = {addPanel} setForm={setForm} refresh={refresh} />)}

      { editFormPanel && (<AdminEditFormPanel admin = {admin} toggleEditFormPanel = {toggleEditFormPanel} editFormPanel = {editFormPanel} setForm={setForm} refresh={refresh} form = {form} />)}
    </div>
  );
};

export default AdminMainPage;
