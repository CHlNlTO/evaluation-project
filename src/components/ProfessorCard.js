import "../css/ProfessorCardComponent.css";

const ProfessorCardComponent = () => {
  return (
    <div className="professor-card-component">
        <div className="courses-container">
            <div className="course-dropdown">
                <b className="student-number">Courses</b>
                <button className="dropdown-arrow" />
            </div>
        </div>
        <div className="professor-details-outer-contai">
            <div className="professor-details-middle-conta">
                <img
                className="professor-details-inner-contai-icon" src="/img/professor_image.png"
                />
            </div>
        </div>
        <div className="professor-name-container">
            <b className="professor-name1">Bryan Briones</b>
        </div>
    </div>
  );
};

export default ProfessorCardComponent;
