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
    const confirm = window.confirm(`Remove ${form.evaluation_title}?` );

    if (confirm) {
      deleteForm();
    }

  }

  const deleteForm = async () => {

    const { data, error } = await supabase
        .from("archive_evaluations")
        .upsert(form)
      
      if (error) {
        console.log("Error inserting form into archives: ", error.message)
        return;
      }

      if (data) {
        console.log("Successfully inserted form into archives: ", data)
      }

    const { error: errorForm } = await supabase
      .from("evaluations")
      .delete()
      .eq("evaluation_id", form.evaluation_id);
      
    if (errorForm) {
      console.log("Error archiving form: ", errorForm.message)
      return;
    }
    console.log("Succesfully archived form.")
    window.alert("Form succesfully removed.");
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
