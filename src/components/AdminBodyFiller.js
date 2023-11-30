const AdminBodyFiller = ({toggleCreatePanel}) => {

  return (
    <div className="admin-create-evaluation-contai">
      <div className="admin-create-evaluation-layout">
        <div className="admin-evaluation-form-title-te">
          Evaluation Form
        </div>
        <div className="admin-evaluation-form-paragrap">
          Select an evaluation form from the navigation panel on the
          left to view its data, or create a new one.
        </div>
        <div className="admin-evaluation-form-create-f" onClick={toggleCreatePanel}>
          <div className="admin-evaluation-form-create-f1">
            Create Evaluation Form
          </div>
        </div>
      </div>
    </div>
  );

};

export default AdminBodyFiller;