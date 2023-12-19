import "./AdminStatisticsFormComponent.css"

const AdminStatisticsFormComponent = ({form, fetchQuestions, setForm, toggleFormDropdown, setFormTitle}) => {

  const displayQuestions = async () => {

    await setForm(form);
    await fetchQuestions();
    setFormTitle(form.evaluation_title)
    toggleFormDropdown();

  }

  return (

    <div className="admin-select-form-title-contai" onClick = {() => {displayQuestions()}}>
      <div className="admin-select-form-title">
        {form.evaluation_title}
      </div>
    </div>

  );

}

export default AdminStatisticsFormComponent;