import supabase from "../config/supabaseClient"
import { useState, useEffect } from 'react'
import "../css/Login.css"
import useFormValidation from '../utilities/FormValidation';
import RegisterCourseDropdownConta from "../components/RegisterCourseDropdownConta";
import RegisterCourseDropdownList from "../components/RegisterCourseDropdownList";


const Login = ({ handleLogin, setUser, setRoleId }) => {   

    // Switch from Login to Register Logic
    const [isClicked, setIsClicked] = useState(false);
    const switchPage = () => {
        setIsClicked((prevIsClicked) => !prevIsClicked);
    };

    const {
      stdnum,
      Fname,
      Lname,
      email,
      password,
      course,
      emailInputValue,
      stdnumError,
      FnameError,
      LnameError,
      emailError,
      passwordError,
      courseError,
      setEmailError,
      setPasswordError,
      setCourseError,
      setStdnumError,
      handleInputChange,
      checkRequired,
      toUpperCase,
      toLowerCase,
      setStdnum,
      setFname,
      setLname,
      setEmail,
      setEmailInputValue,
      setPassword,
      setCourse,
      updateEmailInput
      } = useFormValidation();

    const [userId, setUserId] = useState(0);
    const [pass, setPass] = useState(false);


    // Login Logic
    const [fetchError, setFetchError] = useState(null)
    const fetchLogin = async (event) => {
        event.preventDefault();
        try {
          const email = document.querySelector('.email-2').value;
          const password = document.querySelector('.password-2').value;

          const { data, error } = await supabase
            .from('users')
            .select("email, role_id, user_id")
            .eq('email', email)
            .eq('password', password)
    
          if (error) {
            setFetchError(error);
            setEmailError('Wrong email');
            setPasswordError('Wrong password')
            console.log(fetchError)
          }
    
          if (data && data.length > 0) {
            setUser(data[0].user_id);
            setRoleId(data[0].role_id);
            handleLogin();
            console.log("afdsadfasfasfsafsaget",data)
          } else {
            setPasswordError('Wrong email or password');
            console.log(data);
         
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

    
    const handleRegistration = async (event) => {
        event.preventDefault();
      
        const isRequired = checkRequired(['stdnum', 'Fname', 'Lname', 'email', 'password']);
      
        if (isRequired) {
          return;
        }
        setPass(true);
        console.log(pass);

        try {
            const student_number = toUpperCase(stdnum);
            const emailAdd = toLowerCase(emailInputValue);
            
            // First Query To Check Duplicates From Students Table
            const { data: existingUser, error: duplicateError } = await supabase
            .from('students')
            .select('student_number')
            .eq('student_number', student_number);

            if (duplicateError) {
                console.error('Error checking for duplicates:', duplicateError.message);
                return;
            } 

            if (existingUser && existingUser.length > 0) {
                setStdnumError('Student Number is already registered');
                return;
            } 

            // Second Query To Insert Into User Table
            const { data: userData, error: userError } = await supabase
              .from('users')
              .upsert([
                {
                  email: emailAdd,
                  password: password,
                  role_id: 2
                },
              ]);
        
            if (userError) {
              console.error('Error saving data to Supabase:', userError.message);
              return;
            }
            
            // Third Query To Extract User ID From User Table
            const { data: userIdData, error: userIdError } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', emailAdd);

            if (userIdError) {
                console.error('Error retrieving data:', userIdError.message);
                return;
            } 

            if (userIdData && userIdData.length > 0) {
                setUserId(userIdData[0].user_id);
            } 
        
        } catch (error) {
            console.error('Catch Error during registration:', error.message);
          }

      };

    useEffect(() => {  
      
      const handleStudentInsertion = async () => {
        try {
          console.log(userId);
          if (userId && userId >= 0) {
            // Fourth Query To Insert Into Students Table
            const { data: studentData, error: errorStudentData } = await supabase
              .from('students')
              .upsert([
                {
                  user_id: userId,
                  student_number: stdnum.toUpperCase(),
                  first_name: Fname,
                  last_name: Lname,
                  course_id: course.course_id,
                },
              ]);
              
                console.log("Error Student Data:  ", errorStudentData)
              
              setPassword('');
            }
          } catch (error) {
            
          }
          console.log("Student registration successful:");
          window.alert("Student registered successfully!");
          setUserId(null)
        };
        
        if (userId) {
        handleStudentInsertion();
        }

      }, [userId]);

    // Toggle Panel Start
    const [courseDropdown, setCourseDropdown] = useState(false);
    
    const toggleCourseDropdown = () => {

      setCourseDropdown(!courseDropdown);

    }

    const [courses, setCourses] = useState(null);

    useEffect(() => {

      const getCourses = async () => {
        try {
          const {data, error} = await supabase
          .from('courses')
          .select()
          .order("course_id")

          if (error) {
            console.log("Error fetching courses: ", error.message)
          }
          setCourses(data)
        }
        catch(error) {
          console.log("Error extracting courses: ", error.message)
        }
      }

      getCourses();

    });

    // Toggle Panel End

    return (
        <div className="user-login-regiser-page">
            <div className="user-login-register">
                <div className = {isClicked ? 'login-register-container right-panel-active' : 'login-register-container'} >
                    <div className="form-container register-container">
                        <form onSubmit={handleRegistration}>
                        <h1 className="register-title">EVALUATION FORM</h1>
                        <div className={`form-control ${stdnumError.length > 0 ? 'error' : 'success'}`}>
                            <input className="stdnum-input"type="text" id="stdnum" placeholder="Student Number" onChange={(e) => handleInputChange('stdnum', e.target.value)} onInput={(e) => updateEmailInput(e.target.value)}/>
                            <small id="username-error">{stdnumError}</small>
                            <span></span>
                        </div>
                        <div className={`form-control ${FnameError.length > 0 ? 'error' : 'success'}`}>
                            <input className="fname-input" type="text" id="Fname" placeholder="First Name" onChange={(e) => handleInputChange('Fname', e.target.value)} />
                            <small id="Fname-error">{FnameError}</small>
                            <span></span>
                        </div>
                        <div className={`form-control ${LnameError.length > 0 ? 'error' : 'success'}`}s>
                            <input className="lname-input"type="text" id="Lname" placeholder="Last Name" onChange={(e) => handleInputChange('Lname', e.target.value)} />
                            <small id="username-error">{LnameError}</small>
                            <span></span>
                        </div>
                        <div className={`form-control ${course.length > 0 ? 'error' : 'success'}`} >
                        <RegisterCourseDropdownConta course = {course} toggleCourseDropdown = {() => {toggleCourseDropdown()}} />
                            <small id="course-error">{courseError}</small>
                            <span></span>
                        {courseDropdown && <RegisterCourseDropdownList courses={courses} setCourse={setCourse} toggleCourseDropdown = {toggleCourseDropdown} />}
                        </div>
                        <div className={`form-control ${emailError.length > 0 ? 'error' : 'success'}`}>
                            <input className="email-input" type="email" value={emailInputValue} id="email" placeholder="@firstasia.edu.ph" readOnly/>
                            <small id="username-error">{emailError}</small>
                            <span></span>
                        </div>
                        <div className={`form-control ${passwordError.length > 0 ? 'error' : 'success'}`} >
                            <input className="password-input" type="password" id="password" placeholder="Password" onChange={(e) => handleInputChange('password', e.target.value)} />
                            <small id="password-error">{passwordError}</small>
                            <span></span>
                        </div>
                        <button className="register-button" type="submit" value="submit">Register</button>
                        </form>
                    </div>

                    <form className="form-container login-container" >
                        <div className="form-lg">
                            <h1 className="register-title">EVALUATION FORM</h1>
                            <div className="form-control2">
                                <input type="email" className="email-2" placeholder="Email" tabIndex={1} />
                                <small className="email-error-2"></small>
                                <span></span>
                            </div>
                            <div className="form-control2">
                                <input type="password" className="password-2" placeholder="Password" tabIndex={2} />
                                <small className="password-error-2">{passwordError}</small>
                                <span></span>
                            </div>

                            <div className="content">
                                <div className="checkbox">
                                <input type="checkbox" name="checkbox" id="checkbox" tabIndex={3} />
                                <label htmlFor="">Remember me</label>
                                </div>
                                <div className="pass-link">
                                <a className="forgot-password" href="https://www.google.com" tabIndex={4} >Forgot password</a>
                                </div>
                            </div>
                            <button className="login-button"type="submit" value="submit" tabIndex={5} onClick = { fetchLogin } >Login</button>
                        </div>
                    </form>

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="title">
                                <div>Answer quick surveys</div>
                                easily
                                </h1>
                                <button className="ghost goto-login-button" id="login" onClick={switchPage}>
                                Login
                                <i className="fa-solid fa-arrow-left"></i>
                                </button>
                            </div> 

                            <div className="overlay-panel overlay-right">
                                <h1 className="title">
                                <div>Manage your surveys</div>
                                with ease
                                </h1>
                                <button className="ghost goto-register-button" id="register" tabIndex={6} onClick={switchPage}>
                                Register
                                <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default Login;
