
import AdminCreateFormPanelEvalua from "./AdminCreateFormPanelEvalua";
import "./AdminCreateFormPanelContai.css";
import { useState, useEffect } from 'react';


const AdminCreateFormPanelContai = ({ evalPanel, toggleCreatePanel }) => {

  const [fade, setFade] = useState(false);

  useEffect(() => {

    setFade(!fade);

  }, [evalPanel]);

  return (
    <div className={` ${fade ? 'admin-create-form-panel-contai active' : 'admin-create-form-panel-contai inactive'}` }>
      <div className="admin-create-form-panel-title-">
        <button className="admin-create-form-panel-title">
          Evaluation Forms
        </button>
      </div>
      <div className="admin-create-form-panel-button">
        <button className="admin-create-form-panel-add-bu" onClick = {toggleCreatePanel}>
          <div className="admin-create-form-panel-add-bu1">
            <img
              className="admin-create-form-panel-add-bu-icon"
              alt=""
              src={require('../img/admin-create-form-panel-add-button-logo.svg').default }
            />
            <div className="admin-create-form-panel-add-bu2">
              Create evaluation form
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
              placeholder="Search Forms"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="admin-create-form-panel-forms-">
        <div className="admin-create-form-panel-forms-1">
          <div className="admin-create-form-panel-forms-2">Forms (#)</div>
        </div>
        <div className="admin-create-form-panel-evalua3">
          <AdminCreateFormPanelEvalua />


        </div>
      </div>
    </div>
  );
};

export default AdminCreateFormPanelContai;
