import "./AdminCreateFormQuestionCom.css";

const AdminCreateFormQuestionCom = ({question, handleQuestionTextChange, handleDeleteQuestion}) => {
  return (
    <div className="admin-create-form-question-com">
      <div className="admin-create-form-question-num">
        <div className="admin-create-form-question-nu">{question.question_number}</div>
      </div>
      <input
        className="admin-create-form-question-tex"
        placeholder="Enter question here..."
        type="text"
        defaultValue={question.question_text}
        onChange = { (e) => {handleQuestionTextChange(question.question_number, e.target.value)} }
      />
      <img
        className="admin-body-evaluation-form-tab-icon1"
        alt=""
        src={require('../img/admin-body-evaluation-form-table-delete-question-container.svg').default} 
        onClick = {() => handleDeleteQuestion(question.question_number)}
      />
    </div>
  );
};

export default AdminCreateFormQuestionCom;
