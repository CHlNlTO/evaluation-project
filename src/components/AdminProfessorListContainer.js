import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import "./AdminProfessorListContainer.css";

const AdminProfessorListContainer = ({prof, setProfessor, toggleProfBody, refresh, toggleEditProfPanel}) => {

  const passDetails = () => {
    setProfessor(prof)
    toggleProfBody()
  }

  useEffect(() => {

    setProfessor(prof)

  },[prof])

  const toggleDeleteProf = () => {
    const confirm = window.confirm(`Remove ${prof.first_name + ' ' + prof.last_name}?` );

    if (confirm) {
      deleteProf();
    }

  }

  const deleteProf = async () => {

      const { data, error } = await supabase
        .from("archive_professors")
        .upsert(prof)
      
      if (error) {
        console.log("Error inserting professor into archives: ", error.message)
        return;
      }

      if (data) {
        console.log("Successfully inserted professor into archives: ", data)
      }

      const { error: errorForm } = await supabase
        .from("professors")
        .delete()
        .eq("professor_id", prof.professor_id);
        
      if (errorForm) {
        console.log("Error deleting professor: ", errorForm.message)
        return;
      }
      console.log("Succesfully archived professor.")
      window.alert("Professor succesfully removed.");
      refresh();
    }


  return (
    <div className="admin-create-form-panel-evalua">
      <div className="admin-create-form-panel-evalua1">
        <img
          className="admin-create-form-panel-evalua-icon"
          alt=""
          src={require('../img/admin-professor-panel-logo.svg').default }
          onClick = {() => {passDetails()}}
        />
        <div className="admin-create-form-panel-evalua2" onClick = {() => {passDetails()}}>
          {prof.first_name + ' ' + prof.last_name}
        </div>
        <div className = "admin-create-form-panel-dropdown-container" onClick = {() => {toggleDeleteProf()}}>
          <img className="admin-form-dropdown-delete-icon" alt="" src={require('../img/admin-form-dropdown-delete-icon.svg').default} />
        </div>
      </div>
    </div>
  );
};

export default AdminProfessorListContainer;
