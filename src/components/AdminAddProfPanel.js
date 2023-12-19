import supabase from "../config/supabaseClient";
import "./AdminAddProfPanel.css"
import { useState, useEffect, useRef } from "react";

const AdminAddProfPanel = ({toggleAddProfPanel, refresh}) => {

  const firstName = useRef(null);
  const lastName = useRef(null);

  const [addProfessor, setAddProfessor] = useState({first_name: '', last_name: ''});

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  useEffect(() => {

    if (firstName.current && lastName.current) {
      setFirstName(firstName.current.value);
      setLastName(lastName.current.value);
      setAddProfessor({first_name, last_name});
    }
    console.log(first_name);
    console.log(last_name);
    console.log(addProfessor);   

}, [first_name, last_name]);

  const handleAddProfessor = async (e) => {

    e.preventDefault()

    const { error } = await supabase
    .from('professors')
    .insert(addProfessor);

    console.log(addProfessor);

    if (error) {
        console.error('Error inserting professor:', error);
    } 
    
    toggleAddProfPanel();
    refresh();
    console.log('Data inserted successfully!');
    window.alert("Professor added successfully!");
  }
  

  return (
    <div className="admin-add-professor-container">
      <div className="admin-professor-details-layout1">
        <div className="admin-professor-details-contai1">
          <div className="admin-professor-first-name-con1">
            <div className="admin-professor-first-name-lay1">
              <div className="admin-professor-first-name-lab2">
                First Name:
              </div>
              <input
                className="admin-professor-first-name-tit1"
                placeholder="Juan"
                type="text"
                ref = {firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                tabIndex={1}
              />
            </div>
          </div>
          <div className="admin-professor-last-name-cont1">
            <div className="admin-professor-first-name-lay1">
              <div className="admin-professor-first-name-lab2">Last Name:</div>
              <input
                className="admin-professor-first-name-tit1"
                placeholder="Dela Cruz"
                type="text"
                ref = {lastName} 
                onChange={(e) => setLastName(e.target.value)}
                tabIndex={2}
              />
            </div>
          </div>
          <div className="admin-professor-save-button-co1">
            <button className="admin-add-professor-cancel-button" onClick = {toggleAddProfPanel}>
              <div className="admin-professor-cancel-button-ti1" tabIndex={3}>
                Cancel
              </div>
            </button>
            <button className="admin-add-professor-save-button" onClick = {handleAddProfessor} tabIndex={4}>
              <div className="admin-add-professor-save-button-ti1">
                Save Changes
              </div>
            </button>
          </div>
            
        </div>
      </div>
    </div>
  );
}

export default AdminAddProfPanel;