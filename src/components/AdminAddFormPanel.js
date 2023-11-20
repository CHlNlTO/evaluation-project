import supabase from "../config/supabaseClient";
import { useState, useEffect, useRef } from 'react';
import "./AdminAddFormPanel.css";

const AdminAddFormPanel = ({toggleCreatePanel}) => {

    const evaluation = useRef(null);
    const acadYear = useRef(null);

    const [addData, setAddData] = useState({evaluation_title: '', academic_year: ''});

    const [evaluation_title, setEvaluationTitle] = useState('');
    const [academic_year, setAcademicYear] = useState('');


    useEffect(() => {

        if (evaluation.current && acadYear.current) {
            setEvaluationTitle(evaluation.current.value);
            setAcademicYear(acadYear.current.value);
            setAddData({evaluation_title, academic_year});
        }
        console.log(evaluation_title);
        console.log(academic_year);
        console.log(addData);   

    }, [evaluation_title, academic_year]);
    // useEffect(() => {
    //     setName(document.getElementById("admin-create-form-panel-name").innerText);
    //     setYear(document.getElementById("admin-create-form-panel-year").innerText);
    // }, [evaluation_title, academic_year]); 

    const addEval = async (e) => {

        e.preventDefault()

        const { data , error } = await supabase
        .from('evaluations')
        .insert(addData);
    
        console.log(addData, "fdsafadsfasd");

        if (error) {
            console.error('Error inserting data:', error);
          } 
          
        if (data) {
            console.log('Data inserted successfully!');
        }
      }

  return (
    <div className="admin-add-form-panel-background">
    <div className="admin-add-form-panel" id = "admin-add-form-panel">
      <div className="admin-add-form-panel-footer-co">
        <button className="admin-add-form-panel-cancel-bu" onClick = {toggleCreatePanel}>
          <div className="admin-add-form-panel-cancel-bu1">Cancel</div>
        </button>
        <button className="admin-add-form-panel-submit-bu">
          <div className="admin-add-form-panel-submit-bu1" onClick = { addEval } >Add Form</div>
        </button>
      </div>
      <div className="admin-add-form-body-container">
        <div className="admin-create-form-panel-acad-y" >
          <input
            className="admin-create-form-panel-name-e"
            placeholder="e.g. 2023-2024"
            type="text" id = "admin-create-form-panel-year" ref = {acadYear} onChange={(e) => setAcademicYear(e.target.value)}
          />
          <div className="admin-create-form-panel-name-t">Academic Year</div>
        </div>
        <div className="admin-create-form-panel-name-l">
          <input
            className="admin-create-form-panel-name-e"
            placeholder="e.g. Teacher Evaluation Forms"
            type="text" id = "admin-create-form-panel-name" ref = {evaluation} onChange={(e) => setEvaluationTitle(e.target.value)}
          />
          <div className="admin-create-form-panel-name-t">Name</div>
        </div>
      </div>
      <div className="admin-add-form-panel-title-con">
        <div className="admin-create-form-panel-title-1">
          Create a new evaluation form
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminAddFormPanel;
