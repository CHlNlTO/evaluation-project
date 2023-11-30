import supabase from "../config/supabaseClient";
import { useState, useEffect, useRef } from 'react';
import "./AdminAddFormPanel.css";


const AdminAddFormPanel = ({toggleCreatePanel, addPanel, refresh, admin}) => {

    const evaluation = useRef(null);
    const acadYear = useRef(null);

    const [addData, setAddData] = useState({evaluation_title: '', academic_year: '', admin_id: admin.admin_id});

    const [evaluation_title, setEvaluationTitle] = useState('');
    const [academic_year, setAcademicYear] = useState('');

    const [fade, setFade] = useState(false);

    useEffect(() => {

      setFade(!fade);

    }, [addPanel]);


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

    const addEval = async (e) => {

        e.preventDefault()

        const { data , error } = await supabase
        .from('evaluations')
        .insert(addData);
    
        console.log(addData, "fdsafadsfasd");

        if (error) {
            console.error('Error inserting data:', error);
        } 
        
        toggleCreatePanel();
        refresh();
        console.log('Data inserted successfully!');
        window.alert("Form added successfully!");
      }

  return (
    <div className={` ${fade ? 'admin-add-form-panel-background active' : 'admin-add-form-panel-background inactive'} `} /*onClick = {toggleCreatePanel}*/>
    <div className={` ${fade ? 'admin-add-form-panel active' : 'admin-add-form-panel inactive'} `} id = "admin-add-form-panel">
      <div className="admin-add-form-panel-footer-co">
        <button className="admin-add-form-panel-cancel-bu" onClick = {toggleCreatePanel}>
          <div className="admin-add-form-panel-cancel-bu1" tabIndex={3}>Cancel</div>
        </button>
        <button className="admin-add-form-panel-submit-bu">
          <div className="admin-add-form-panel-submit-bu1" onClick = { addEval } tabIndex={4} >Add Form</div>
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
          Create a new evaluation form
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminAddFormPanel;
