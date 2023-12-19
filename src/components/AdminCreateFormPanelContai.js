
import AdminCreateFormPanelEvalua from "./AdminCreateFormPanelEvalua";
import "./AdminCreateFormPanelContai.css";
import { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient";


const AdminCreateFormPanelContai = ({ evalPanel, toggleCreatePanel, setForm, toggleEvalBody, refreshForms, refresh, toggleEditFormPanel}) => {

  const [fade, setFade] = useState(false);

  useEffect(() => {

    setFade(!fade);

  }, [evalPanel]);

  // Fetch Evaluations
  const [fetchError, setFetchError] = useState(null)
  const [forms, setForms] = useState(null)

  useEffect(() => {
    const fetchForms = async () => {
        const { data, error } = await supabase
        .from('evaluations')
        .select()
        .order("evaluation_id", { ascending: true })

        if (error) {    
            setFetchError('No data found.')
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
  // Fetch Evaluations End

  const [searchQuery, setSearchQuery] = useState();

  const filteredForms = searchQuery ? forms && forms.filter(form =>
    form.evaluation_title && form.evaluation_title.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
  ) : forms;

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="admin-create-form-panel-forms-">
        <div className="admin-create-form-panel-forms-1">
          <div className="admin-create-form-panel-forms-2">Forms ({filteredForms && filteredForms.length})
          </div>
        </div>
        <div className="admin-create-form-panel-evaluation-list-container">
          {fetchError && (<p>{fetchError}</p>)}
          {filteredForms && (
            <div className="admin-create-form-panel-evalua3">
              {filteredForms.map(form => (
                <AdminCreateFormPanelEvalua
                  key={form.evaluation_id}
                  form={form}
                  setForm={setForm}
                  toggleEvalBody={toggleEvalBody}
                  refresh={refresh}
                  toggleEditFormPanel={toggleEditFormPanel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminCreateFormPanelContai;
