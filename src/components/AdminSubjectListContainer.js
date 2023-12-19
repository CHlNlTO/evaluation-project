import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import "./AdminSubjectListContainer.css";

const AdminSubjectListContainer = ({subj, setSubject, toggleSubjectBody, refresh, toggleEditSubjectPanel}) => {

  const passDetails = () => {
    setSubject(subj)
    toggleSubjectBody()
  }

  useEffect(() => {

    setSubject(subj)

  },[subj])

  const toggleDeleteSubject = () => {
    const confirm = window.confirm(`Remove ${subj.subject_name}?` );

    if (confirm) {
      deleteSubject();
    }

  }

  const deleteSubject = async () => {

      const { data, error } = await supabase
        .from("archive_subjects")
        .upsert(subj)
      
      if (error) {
        console.log("Error inserting subject into archives: ", error.message)
        return;
      }

      if (data) {
        console.log("Successfully inserted subject into archives: ", data)
      }

      const { error: errorSubject } = await supabase
        .from("subjects")
        .delete()
        .eq("subject_id", subj.subject_id);
        
      if (errorSubject) {
        console.log("Error deleting subject: ", errorSubject.message)
        return;
      }
      console.log("Succesfully archived subject.")
      window.alert("Subject succesfully removed.");
      refresh();
    }


  return (
    <div className="admin-create-form-panel-evalua">
      <div className="admin-create-form-panel-evalua1">
        <img
          className="admin-create-form-panel-evalua-icon"
          alt=""
          src={require('../img/admin-create-form-panel-evaluation-forms-logo.svg').default }
          onClick = {() => {passDetails()}}
        />
        <div className="admin-create-form-panel-evalua2" onClick = {() => {passDetails()}}>
          {subj.subject_name}
        </div>
        <div className = "admin-create-form-panel-dropdown-container" onClick = {() => {setSubject(subj); toggleEditSubjectPanel()}}>
          <img className="admin-form-dropdown-edit-icon" alt="" src={require('../img/admin-form-dropdown-edit-icon.svg').default} />
        </div>
        <div className = "admin-create-form-panel-dropdown-container" onClick = {() => {toggleDeleteSubject()}}>
          <img className="admin-form-dropdown-delete-icon" alt="" src={require('../img/admin-form-dropdown-delete-icon.svg').default} />
        </div>
      </div>
    </div>
  );
};

export default AdminSubjectListContainer;
