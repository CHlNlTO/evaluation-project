import FormEvaluationQuestionRadiosCo from "../components/FormEvaluationQuestionRadiosCo";
import NavbarDropdownComponent from "../components/NavbarDropdownComponent";
import UserNavbar from "../components/UserNavbar";
import "../css/UserEvaluationPage.css";

const UserEvaluationPage = () => {
  return (
    <div className="user-evaluation-page">
      <UserNavbar />
      <div className="form-body-evaluation-container">
        <div className="form-likert-scale-container">
          <div className="form-likert-scale-score-container">
            <div className="form-likert-score-1">1</div>
            <div className="form-likert-score-2">2</div>
            <div className="form-likert-score-3">3</div>
            <div className="form-likert-score-4">4</div>
            <div className="form-likert-score-5">5</div>
          </div>
        </div>
        <div className="form-evaluation-question-auto-">
          <FormEvaluationQuestionRadiosCo />
        </div>
      </div>
      <div className="form-professor-details-contain">
        <div className="form-subject-name">CSPL101</div>
        <div className="frame">
          <div className="form-evaluation-score-containe">
            <div className="form-score-progress-container">
              <div className="form-current-score-container">
                <div className="form-current-score">0</div>
              </div>
              <div className="form-overall-score-container">
                <div className="form-current-score">25</div>
              </div>
            </div>
          </div>
          <div className="form-professor-name">JOSEPH MALALUAN</div>
        </div>
      </div>
      <div className="form-submit-button-container">
        <button className="form-submit-button">
          <div className="form-submit-title">Submit</div>
        </button>
      </div>
      <div className="user-navbar-dropdown-container">
        <NavbarDropdownComponent
          navbarDropdownComponentPosition="absolute"
          navbarDropdownComponentTop="0px"
          navbarDropdownComponentRight="0px"
          navbarDropdownLogoutContaCursor="pointer"
          navbarDropdownLogoutContaBorder="none"
          navbarDropdownLogoutContaPadding="0"
          navbarDropdownSettingsConCursor="pointer"
          navbarDropdownSettingsConBorder="none"
          navbarDropdownSettingsConPadding="0"
          navbarDropdownAboutContaiCursor="pointer"
          navbarDropdownAboutContaiBorder="none"
          navbarDropdownAboutContaiPadding="0"
          navbarDropdownAccountContCursor="pointer"
          navbarDropdownAccountContBorder="none"
          navbarDropdownAccountContPadding="0"
        />
      </div>
      <div className="user-evaluation-page-mobile-v1">
        <div className="form-navbar-top">
          <div className="form-navbar-top1">
            <div className="professor-details-container">
              <div className="professor-name">Joseph Malaluan</div>
              <div className="professor-subject">CSPL101</div>
            </div>
            <img className="back-arrow-icon" alt="" src="/back-arrow.svg" />
          </div>
          <div className="form-evaluation-score-containe1">
            <div className="form-score-progress-container1">
              <div className="form-current-score-container1">
                <div className="form-current-score1">0</div>
              </div>
              <div className="form-overall-score-container1">
                <div className="form-overall-score1">25</div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-body-evaluation-moible-co">
          <div className="form-navbar-bottom">
            <img
              className="form-hamburger-menu-icon"
              alt=""
              src="/hamburger-menu1.svg"
            />
            <img
              className="form-profs-icon"
              alt=""
              src="/form-profs-icon.svg"
            />
            <img
              className="form-course-icon"
              alt=""
              src="/form-course-icon.svg"
            />
            <img className="form-home-icon" alt="" src="/form-home-icon.svg" />
          </div>
          <div className="form-body-evaluation-container1">
            <div className="evaluation-question-container">
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The professor starts the class on time.
                </div>
                <div className="form-question-number1">1.</div>
              </div>
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The professor ends the class on time.
                </div>
                <div className="form-question-number1">2.</div>
              </div>
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The objectives are met by the professor.
                </div>
                <div className="form-question-number1">3.</div>
              </div>
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The professor explains the topics very well.
                </div>
                <div className="form-question-number1">4.</div>
              </div>
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The professor proficiently uses technological tools in his
                  disposal.
                </div>
                <div className="form-question-number1">5.</div>
              </div>
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The professor enthusiastically introduces the topics
                  discussed.
                </div>
                <div className="form-question-number1">6.</div>
              </div>
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src="/form-likert-score-container.svg"
                />
                <div className="form-question-title1">
                  The professor is gracious to provide restitution activities
                  for those students who fail to comply immediately.
                </div>
                <div className="form-question-number1">7.</div>
              </div>
            </div>
            <div className="form-likert-scale-container1">
              <div className="form-likert-scale">5 4 3 2 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEvaluationPage;
