import { useState } from 'react';
import AdminCreateFormPanelContai from "../components/AdminCreateFormPanelContai";
import AdminCreateFormQuestionCom from "../components/AdminCreateFormQuestionCom";
import AdminAddFormPanel from "../components/AdminAddFormPanel";
import AdminBodyFiller from '../components/AdminBodyFiller';
import "../css/AdminMainPage.css";

const AdminMainPage = (sessionID) => {

  

    //Panels Start
    const [addPanel, setAddPanel] = useState(false);
    const [evalPanel, setEvalPanel] = useState(false);
    const [bodyModal, setBodyModal] = useState(false);
  
    const toggleCreatePanel = () => {
      setAddPanel(!addPanel)
    }
    
    const toggleEvalPanel = () => {
      setEvalPanel(!evalPanel)
    }
    
    const toggleBodyModal = () => {
      if (bodyModal === false) {
        setBodyModal(true)
      } else
        setBodyModal(false)
    }
    // Panels End

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
        {evalPanel && <AdminCreateFormPanelContai evalPanel = {evalPanel} toggleCreatePanel = {toggleCreatePanel} />}
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
              <button className="admin-navbar-id">Admin ID</button>
              <div className="admin-navbar-separator" />
              <button className="admin-navbar-username">Admin Username</button>
            </div>
          </nav>
          <div className="admin-body-container1">
            <div className="admin-body-evaluation-form-tit">
              <div className="admin-body-evaluation-form-tit1">
                Evaluation Forms Title
              </div>
              <button className="admin-body-evaluation-form-sav">
                <div className="admin-body-evaluation-form-sav1">
                  Save Changes
                </div>
              </button>
            </div>
            <div className="admin-body-evaluation-form-tab">
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
                  src={require('../img/admin-body-evaluation-form-table-add-question-container.svg').default}
                />
              </div>
              <div className="admin-body-evaluation-form-tab11">
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
                <AdminCreateFormQuestionCom />
              </div>
            </div>
            { !addPanel && (<AdminBodyFiller toggleCreatePanel = {toggleCreatePanel}/>)}
          </div>
        </div>
      </div>
      { addPanel && (<AdminAddFormPanel toggleCreatePanel = {toggleCreatePanel} />)}
    </div>
  );
};

export default AdminMainPage;
