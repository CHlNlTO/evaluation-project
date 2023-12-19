
import AdminProfessorListContainer from "./AdminProfessorListContainer";
import "./AdminProfessorPanelContainer.css";
import { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient";


const AdminProfessorPanelContainer = ({ profPanel, professors, setProfessors, toggleProfBody, refreshProfessors, refresh, toggleAddProfPanel, professor, setProfessor, toggleEditProfPanel}) => {

  const [fade, setFade] = useState(false);

  useEffect(() => {

    setFade(!fade);

  }, [profPanel]);

  // Fetch Evaluations
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchProfessors = async () => {
        const { data, error } = await supabase
        .from('professors')
        .select()
        .order("professor_id", { ascending: true })

        if (error) {    
            setFetchError('No data found.')
            setProfessors(null)
            console.log(error)
        }
        if (data) {
            console.log(data)
            setProfessors(data)
            setFetchError(null)
        }
    }

    fetchProfessors()
  }, [refreshProfessors])
  // Fetch Evaluations End

  const [searchQuery, setSearchQuery] = useState();

  const addedFullNameProfessors = professors && professors.map(professor => ({
    professor_id: professor.professor_id,
    first_name: professor.first_name,
    last_name: professor.last_name,
    full_name: professor.first_name + ' ' + professor.last_name,
  })) 

  const filteredProfessors = searchQuery
  ? addedFullNameProfessors &&
    addedFullNameProfessors.filter((professor) => {
      const fullName = professor.full_name;

      const professorString = JSON.stringify(fullName);

      if (typeof searchQuery === 'string') {
        const lowercaseSearchQuery = searchQuery.toString().toLowerCase();

        return professorString.toLowerCase().includes(lowercaseSearchQuery);
      }

      return false;
    })
  : professors;

  return (
    <div className={` ${fade ? 'admin-create-form-panel-contai active' : 'admin-create-form-panel-contai inactive'}` }>
      <div className="admin-create-form-panel-title-">
        <button className="admin-create-form-panel-title">
          Manage Professors
        </button>
      </div>
      <div className="admin-create-form-panel-button">
        <button className="admin-create-form-panel-add-bu" onClick = {toggleAddProfPanel}>
          <div className="admin-create-form-panel-add-bu1">
            <img
              className="admin-create-form-panel-add-bu-icon"
              alt=""
              src={require('../img/admin-create-form-panel-add-button-logo.svg').default }
            />
            <div className="admin-create-form-panel-add-bu2">
              Add Professor
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
              placeholder="Search Professor"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="admin-create-form-panel-forms-">
        <div className="admin-create-form-panel-forms-1">
          <div className="admin-create-form-panel-forms-2">Professors ({filteredProfessors && filteredProfessors.length})
          </div>
        </div>
        <div className="admin-create-form-panel-evaluation-list-container">
          {fetchError && (<p>{fetchError}</p>)}
          {filteredProfessors && (
            <div className="admin-create-form-panel-evalua3">
              {filteredProfessors.map(prof => (
                <AdminProfessorListContainer
                  key={prof.professor_id}
                  prof = {prof}
                  professor={professor}
                  setProfessor={setProfessor}
                  toggleProfBody={toggleProfBody}
                  refresh={refresh}
                  toggleEditProfPanel={toggleEditProfPanel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminProfessorPanelContainer;
