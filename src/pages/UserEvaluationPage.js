import supabase from "../config/supabaseClient";
import FormEvaluationQuestionRadiosCo from "../components/FormEvaluationQuestionRadiosCo";
import NavbarDropdownComponent from "../components/NavbarDropdownComponent";
import UserNavbar from "../components/UserNavbar";
import "../css/UserEvaluationPage.css";
import { useState, useEffect, useRef} from 'react';

const UserEvaluationPage = () => {

  const [counter, setCounter] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [storeScore, setStoreScore] = useState({})
  const [dynamicFields, setDynamicFields] = useState([]);
  const [addNavbarDropdownComponent, setAddNavbarDropdownComponent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to close the dropdown
  const closeDropdown = () => {
    setAddNavbarDropdownComponent(false);
  };

  // Add event listeners when the component mounts
  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  useEffect(() => {
    if (counter && counter === totalScore) {
        document.getElementById("form-submit-button-id").style.background = "#10135a";
        setSubmit(true);
    }

  }, [counter, totalScore, submit]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submit === false) {
        console.log(submit, "hamburger");
        return;
    }

    const { data , error } = await supabase
    .from('answers')
    .insert(dynamicFields);

    if (error) {
        console.error('Error inserting data:', error);
      } else
        console.log('Data inserted successfully!');
        setDynamicFields([]);
    
  }

  return (
    <div className="user-evaluation-page">
      <UserNavbar dropdownRef = { dropdownRef } addNavbarDropdownComponent = { addNavbarDropdownComponent } setAddNavbarDropdownComponent = { setAddNavbarDropdownComponent }/>
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
          <FormEvaluationQuestionRadiosCo counter = {counter} setCounter = {setCounter} setTotalScore = {setTotalScore} storeScore = {storeScore} dynamicFields = {dynamicFields} setDynamicFields = {setDynamicFields}/>
        </div>
      </div>
      <div className="form-professor-details-contain">
        <div className="form-subject-name">CSPL101</div>
        <div className="frame">
          <div className="form-evaluation-score-containe">
            <div className="form-score-progress-container">
              <div className="form-current-score-container">
                <div className="form-current-score">{counter}</div>
              </div>
              <div className="form-overall-score-container">
                <div className="form-current-score">{totalScore}</div>
              </div>
            </div>
          </div>
          <div className="form-professor-name">JOSEPH MALALUAN</div>
        </div>
      </div>
      <div className="form-submit-button-container">
        <button className="form-submit-button" id="form-submit-button-id" onClick = {handleSubmit}>
          <div className="form-submit-title">Submit</div>
        </button>
      </div>
      <div className="user-navbar-dropdown-container" id="user-navbar-dropdown-container">
      { addNavbarDropdownComponent && (<NavbarDropdownComponent />)}
      </div>
      <div className="user-evaluation-page-mobile-v1">
        <div className="form-navbar-top">
          <div className="form-navbar-top1">
            <div className="professor-details-container">
              <div className="professor-name">Joseph Malaluan</div>
              <div className="professor-subject">CSPL101</div>
            </div>
            <img className="back-arrow-icon" alt="" src={require('../img/back-arrow.svg').default} />
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
              src={require('../img/hamburger-menu1.svg').default}
            />
            <img
              className="form-profs-icon"
              alt=""
              src={require('../img/form-profs-icon.svg').default}
            />
            <img
              className="form-course-icon"
              alt=""
              src={require('../img/form-course-icon.svg').default}
            />
            <img 
              className="form-home-icon" 
              alt="" 
              src={require('../img/form-home-icon.svg').default}
            />
          </div>
          <div className="form-body-evaluation-container1">
            <div className="evaluation-question-container">
              <div className="form-question-component1">
                <img
                  className="form-likert-score-container-icon1"
                  alt=""
                  src={require('../img/form-likert-score-container.svg').default}
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
                  src={require('../img/form-likert-score-container.svg').default}
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
                  src={require('../img/form-likert-score-container.svg').default}
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
                  src="../img/form-likert-score-container.svg"
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
                  src="../img/form-likert-score-container.svg"
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
                  src="../img/form-likert-score-container.svg"
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
                  src="../img/form-likert-score-container.svg"
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