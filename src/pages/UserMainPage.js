//import "../css/UserMainPage.css";
import ProfessorCardComponent from "../components/ProfessorCard";

const UserMainPage = () => {
  return (
    <div className="user-main-page">
      <div className="user-side-panel-1"></div>
      <div className="user-side-panel">
        <div className="user-details-section">
          <div className="profile-container" />
          <div className="user-name">Clark Wayne Abutal</div>
          <div className="student-number">S2021100408</div>
          <div className="student-number">BSCS-3A</div>
        </div>
        <div className="category-section-container">
          <div className="category-section">
            <div className="student-number">Recent Forms Answered</div>
            <button className="evaluation-title-">
              <ul className="cspl101">CSPL101</ul>
            </button>
            <div className="settings-icon-container">
              <button className="settings-icon" />
            </div>
          </div>
        </div>
      </div>
      <main className="body-container" id="main">
        <div className="navbar-container">
          <div className="navbar-list-container">
            <img
              className="hamburger-menu-icon" src="/img/hamburger_menu.png" alt="menu"/>
            <button className="navbar-profs">PROFS</button>
            <button className="navbar-courses">COURSES</button>
            <button className="navbar-home">{`HOME          `}</button>
          </div>
          <div className="navbar-title-container">
            <button className="navbar-title">EVALUATION FORM</button>
          </div>
        </div>
        <section className="body-inner-container" id="professors_cotainer">
          <main className="body-container1">
            <section className="college-deparment-container">
              <b className="college-department">
                COLLEGE OF COMPUTING AND INFORMATION TECHNOLOGY
              </b>
            </section>
            <section className="professor-list-container">
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
              <ProfessorCardComponent />
            </section>
          </main>
        </section>
      </main>
    </div>
  );
};

export default UserMainPage;
