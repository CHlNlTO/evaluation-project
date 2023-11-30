import "../css/ProfessorCardComponent.css";

const ProfessorCardComponent = ({professor}) => {
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
            <b className="professor-name1">{professor.subjects.professors.first_name + " " + professor.subjects.professors.last_name}</b>
        </div>
    </div>
  );
};

export default ProfessorCardComponent;
