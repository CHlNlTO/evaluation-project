import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import "./AdminCreateFormPanelEvalua.css";

const AdminCreateFormPanelEvalua = ({form, setForm, toggleEvalBody, refresh, toggleEditFormPanel}) => {

  const passDetails = () => {
    console.log(form)
    setForm(form)
    toggleEvalBody()
  }

  useEffect(() => {

    setForm(form)

  },[form])

  const toggleDeleteForm = () => {
    const confirm = window.confirm(`Delete ${form.evaluation_title}?` );

    if (confirm) {
      deleteForm();
    }

  }

  const deleteForm = async () => {
      const { error: errorForm } = await supabase
        .from("evaluations")
        .delete()
        .eq("evaluation_id", form.evaluation_id);
        
      if (errorForm) {
        console.log("Error deleting form: ", errorForm.message)
        return;
      }
      console.log("Succesfully deleted form.")
      window.alert("Form succesfully deleted");
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
          {form.evaluation_title}
        </div>
        <div className = "admin-create-form-panel-dropdown-container" onClick = {() => {toggleEditFormPanel()}}>
          <img className="admin-form-dropdown-edit-icon" alt="" src={require('../img/admin-form-dropdown-edit-icon.svg').default} />
        </div>
        <div className = "admin-create-form-panel-dropdown-container" onClick = {() => {toggleDeleteForm()}}>
          <img className="admin-form-dropdown-delete-icon" alt="" src={require('../img/admin-form-dropdown-delete-icon.svg').default} />
        </div>
      </div>
    </div>
  );
};

export default AdminCreateFormPanelEvalua;
