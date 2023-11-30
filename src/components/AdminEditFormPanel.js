import supabase from "../config/supabaseClient";
import { useState, useEffect, useRef } from 'react';
import "./AdminEditFormPanel.css";


const AdminEditFormPanel = ({toggleEditFormPanel, editFormPanel, refresh, admin, form}) => {

    const evaluation = useRef(null);
    const acadYear = useRef(null);

    const [editData, setEditData] = useState({evaluation_title: '', academic_year: '', admin_id: (admin &&  admin.admin_id)});

    const [evaluation_title, setEvaluationTitle] = useState('');
    const [academic_year, setAcademicYear] = useState('');

    const [fade, setFade] = useState(false);

    useEffect(() => {

      setFade(!fade);

    }, [editFormPanel]);


    useEffect(() => {

        if (evaluation.current && acadYear.current) {
            setEvaluationTitle(evaluation.current.value);
            setAcademicYear(acadYear.current.value);
            setEditData({evaluation_title, academic_year});
        }
        console.log(evaluation_title);
        console.log(academic_year);
        console.log(editData);   

    }, [evaluation_title, academic_year]);

    const editEval = async (e) => {

        e.preventDefault()

        const { data , error } = await supabase
        .from('evaluations')
        .update(editData)
        .eq("evaluation_id", form.evaluation_id)
    
        console.log(editData, "fdsafadsfasd");

        if (error) {
            console.error('Error inserting data:', error);
        } 
        
        toggleEditFormPanel();
        refresh();
        console.log('Data inserted successfully!');
        window.alert("Form edited successfully!");
      }

  return (
    <div className={` ${fade ? 'admin-add-form-panel-background active' : 'admin-add-form-panel-background inactive'} `} /*onClick={toggleEditFormPanel}*/ >
    <div className={` ${fade ? 'admin-add-form-panel active' : 'admin-add-form-panel inactive'} `} id = "admin-add-form-panel">
      <div className="admin-add-form-panel-footer-co">
        <button className="admin-add-form-panel-cancel-bu" onClick = {toggleEditFormPanel}>
          <div className="admin-add-form-panel-cancel-bu1" tabIndex={3}>Cancel</div>
        </button>
        <button className="admin-add-form-panel-submit-bu">
          <div className="admin-add-form-panel-submit-bu1" onClick = { editEval } tabIndex={4} >Edit Form</div>
        </button>
      </div>
      <div className="admin-add-form-body-container">
        <div className="admin-create-form-panel-acad-y" >
          <input
            className="admin-create-form-panel-name-e"
            placeholder="e.g. 2023-2024"
            type="text" id = "admin-create-form-panel-year" ref = {acadYear} onChange={(e) => setAcademicYear(e.target.value)}
            tabIndex={2}
          />
          <div className="admin-create-form-panel-name-t">Academic Year</div>
        </div>
        <div className="admin-create-form-panel-name-l">
          <input
            className="admin-create-form-panel-name-e"
            placeholder="e.g. Teacher Evaluation Forms"
            type="text" id = "admin-create-form-panel-name" ref = {evaluation} onChange={(e) => setEvaluationTitle(e.target.value)}
            tabIndex={1}
          />
          <div className="admin-create-form-panel-name-t">Name</div>
        </div>
      </div>
      <div className="admin-add-form-panel-title-con">
        <div className="admin-create-form-panel-title-1">
          Edit evaluation form
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminEditFormPanel;
