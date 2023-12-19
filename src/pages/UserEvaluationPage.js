import supabase from "../config/supabaseClient";
import FormEvaluationQuestionRadiosCo from "../components/FormEvaluationQuestionRadiosCo";
import NavbarDropdownComponent from "../components/NavbarDropdownComponent";
import UserNavbar from "../components/UserNavbar";
import "../css/UserEvaluationPage.css";
import { useState, useEffect, useRef} from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

const UserEvaluationPage = ({student, professorDetails, setStudent, setProfessorDetails}) => {

  const [counter, setCounter] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [storeScore, setStoreScore] = useState({})
  const [dynamicFields, setDynamicFields] = useState([]);
  const [addNavbarDropdownComponent, setAddNavbarDropdownComponent] = useState(false);
  const dropdownRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [roleId, setRoleId] = useState(0)
  const [user, setUser] = useState(null)
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate()
  
  
  useEffect(() => {
    const storedRole = window.localStorage.getItem('roleId')
    const storedUser = window.localStorage.getItem('user')
    const storedFlag = window.localStorage.getItem('flag')
    const storedStudent = window.localStorage.getItem('student')
    const storedProfDetails = window.localStorage.getItem('profDetails')
    
    if (storedRole !== null || storedUser !== null || storedRole !== false || storedStudent !== null || storedProfDetails !== null) {
      setRoleId(JSON.parse(storedRole))
      setUser(JSON.parse(storedUser))
      setFlag(JSON.parse(storedFlag))
      setStudent(JSON.parse(storedStudent))
      setProfessorDetails(JSON.parse(storedProfDetails))
      setIsLoggedIn(true)
    }

  }, [])

  useEffect(() => {
    console.log("Details", isLoggedIn, roleId, user, flag, professorDetails, student)
  }, [isLoggedIn, roleId, user, flag, professorDetails, student])

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          
          await getStudent();
          const professorData = await getProfessorDetails();

          setProfessorDetails(professorData);
          
          window.localStorage.setItem("roleId", JSON.stringify(roleId))
          window.localStorage.setItem("user", JSON.stringify(user))
          window.localStorage.setItem("flag", JSON.stringify(flag))
          window.localStorage.setItem("student", JSON.stringify(student))
          window.localStorage.setItem("profDetails", JSON.stringify(professorDetails))
          
          navigate(flag === true ? '/UserEvaluationPage' : roleId === 1 ? '/AdminMainPage' : roleId === 2 ? '/UserMainPage' : '/');
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
    };
  
    fetchData();
  }, [isLoggedIn, roleId, user, flag]);

  
  const getStudent = async () => {
    try {

      const { data, error } = await supabase
      .from('students')
        .select(
          `
          *,
          courses(course_id, course_name, departments(department_id, department_title))
          `
        )
      .eq('user_id', user && user);

      console.log("Fetched Data: ", data)

      if (error) {
        console.log("Fetch Error: ", error)
        throw error;
      }

      setStudent(data[0]);
      console.log("Set Student", student);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

  };

  const getProfessorDetails = async () => {
    try {
      // Fetch professor details based on your logic (e.g., from local storage)
      const storedProfDetails = window.localStorage.getItem('profDetails');
      const parsedProfDetails = JSON.parse(storedProfDetails);
      console.log('Parsed Professor Details:', parsedProfDetails);
      return parsedProfDetails;
    } catch (error) {
      console.error('Error fetching professor details:', error.message);
      return null;
    }
  };


  const closeDropdown = () => {
    setAddNavbarDropdownComponent(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

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

  const [response, setResponse] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submit === false) {
        return;
    }

    const { data , error } = await supabase
    .from('answers')
    .insert(dynamicFields);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully!');
      setDynamicFields([]);
    }

    const response = {
      student_id: professorDetails && professorDetails.student_id,
      subject_id: professorDetails && professorDetails.subject_id,
      professor_id: professorDetails && professorDetails.professor_id,
    }

    setResponse(response)
  
    
  }

  useEffect(()  => {

    const addResponse = async () => {
      const { dataResponse , errorResponse } = await supabase
      .from('responses')
      .insert(response);

      if (errorResponse) {
        console.log('Error inserting data:', errorResponse);
      } else {
        console.log('Data inserted successfully!');
        setDynamicFields([]);
        window.alert('You have responded successfully.')
        toggleHome();
      }
    }

    if(response) {
      addResponse();
    }
  }, [response])

  const toggleHome = () => {

    window.localStorage.removeItem('flag')
    navigate('/UserMainPage')

  }

  return (
    <div className="user-evaluation-page">
      <UserNavbar dropdownRef = { dropdownRef } addNavbarDropdownComponent = { addNavbarDropdownComponent } setAddNavbarDropdownComponent = { setAddNavbarDropdownComponent } student = {student} />
=======

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
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86
      <div className="form-body-evaluation-container">
        <div className="form-likert-scale-container">
          <div className="form-likert-scale-score-container">
            <div className="form-likert-score-1">1 - Very{<br></br>}Rarely</div>
            <div className="form-likert-score-2">2 - {<br></br>}Rarely</div>
            <div className="form-likert-score-3">3 - {<br></br>}Occassionaly </div>
            <div className="form-likert-score-4">4 - {<br></br>}Frequently</div>
            <div className="form-likert-score-5">5 - Very{<br></br>}Frequently</div>
          </div>
        </div>
        <div className="form-evaluation-question-auto-">
<<<<<<< HEAD
          {professorDetails && <FormEvaluationQuestionRadiosCo counter = {counter} setCounter = {setCounter} setTotalScore = {setTotalScore} storeScore = {storeScore} dynamicFields = {dynamicFields} setDynamicFields = {setDynamicFields} professorDetails = {professorDetails && professorDetails} student = {student} />}
=======
          <FormEvaluationQuestionRadiosCo counter = {counter} setCounter = {setCounter} setTotalScore = {setTotalScore} storeScore = {storeScore} dynamicFields = {dynamicFields} setDynamicFields = {setDynamicFields}/>
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86
        </div>
      </div>
      <div className="form-professor-details-contain">
        <div className="form-subject-name">{professorDetails && professorDetails.subject_name}</div>
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
          <div className="form-professor-name">{professorDetails && professorDetails.professor_name.toUpperCase()}</div>
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
      {/* <div className="user-evaluation-page-mobile-v1">
        <div className="form-navbar-top">
          <div className="form-navbar-top1">
            <div className="professor-details-container">
              <div className="professor-name">{professorDetails && professorDetails.first_name.toUpperCase() + " " + professorDetails.subjects.professors.last_name.toUpperCase()}</div>
              <div className="professor-subject">{professorDetails && professorDetails.subject_name}</div>
            </div>
            <img className="back-arrow-icon" alt="" src={require('../img/back-arrow.svg').default} />
          </div>
          <div className="form-evaluation-score-containe1">
            <div className="form-score-progress-container1">
              <div className="form-current-score-container1">
                <div className="form-current-score1">{counter}</div>
              </div>
              <div className="form-overall-score-container1">
                <div className="form-overall-score1">{totalScore}</div>
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
      </div> */}
    </div>
  );
};

export default UserEvaluationPage;