import "./AdminStatisticsPanelForm.css";
import AdminStatisticsQuestionComponent from "./AdminStatisticsQuestionComponent"
import AdminStatisticsFormComponent from "./AdminStatisticsFormComponent"
import { useState } from 'react'

const AdminStatisticsPanelForm = ({forms, fetchQuestions, setForm, questions, toggleStatBody, setQuestion}) => {

  const [formDropdown, setFormDropdown] = useState(false)

  const [formTitle, setFormTitle] = useState("Select Evaluation Form")

  const toggleFormDropdown = () => {

    setFormDropdown(!formDropdown)

  }


  return (
    <div className="admin-statistics-panel-contain">
      <div className="admin-select-form-container" />
      <button className="admin-select-form-button-conta" onClick = {() => {toggleFormDropdown()}} >
        <div className="admin-select-form-text-contain">
          <div className="admin-select-form-text">{formTitle}</div>
          <img
            className="admin-select-form-arrow-contai-icon"
            alt=""
            src={require("../img/admin-select-form-arrow-container.svg").default}
          />
        </div>
      </button>
      <div className="admin-statistics-questions-lis">
        {questions && questions.map(question => (
          <AdminStatisticsQuestionComponent 
            question = {question}
            toggleStatBody = {toggleStatBody} 
            setQuestion = {setQuestion}
          />
          ))}

      </div>

      {formDropdown && (
        <div className="admin-select-form-dropdown-con"> 
          {forms.map(form => (
            <AdminStatisticsFormComponent 
              form = {form}
              fetchQuestions = {fetchQuestions}
              setForm = {setForm}
              toggleFormDropdown = {toggleFormDropdown}
              setFormTitle = {setFormTitle}
            />
          ))}
        </div>)}
    </div>
  );
};

export default AdminStatisticsPanelForm;
