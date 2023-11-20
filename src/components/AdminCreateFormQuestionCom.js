import "./AdminCreateFormQuestionCom.css";

const AdminCreateFormQuestionCom = () => {
  return (
    <div className="admin-create-form-question-com">
      <div className="admin-create-form-question-num">
        <div className="admin-create-form-question-nu">1</div>
      </div>
      <input
        className="admin-create-form-question-tex"
        placeholder="Enter question here..."
        type="text"
      />
      <img
        className="admin-body-evaluation-form-tab-icon1"
        alt=""
        src={require('../img/admin-body-evaluation-form-table-delete-question-container.svg').default}
      />
    </div>
  );
};

export default AdminCreateFormQuestionCom;
