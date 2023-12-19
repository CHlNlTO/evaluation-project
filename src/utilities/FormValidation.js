<<<<<<< HEAD
import { useState, useEffect } from 'react';

const useFormValidation = () => {
  const [stdnum, setStdnum] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');

  const [emailInputValue, setEmailInputValue] = useState('');

  const [stdnumError, setStdnumError] = useState('');
  const [FnameError, setFnameError] = useState('');
  const [LnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [courseError, setCourseError] = useState('');

  useEffect(() => {

    setEmail(emailInputValue);
    console.log("Email: ", emailInputValue);

  }, [emailInputValue]);

  const showError = (input, message) => {
    switch (input) {
      case 'stdnum':
        setStdnumError(message);
        break;
      case 'Fname':
        setFnameError(message);
        break;
      case 'Lname':
        setLnameError(message);
        break;
      case 'email':
        setEmailError(message);
        break;
      case 'password':
        setPasswordError(message);
        break;
      case 'course':
        setCourseError(message);
        break;
      default:
        break;
    }
  };

  const showSuccess = (input) => {
    switch (input) {
      case 'stdnum':
        setStdnumError('');
        break;
      case 'Fname':
        setFnameError('');
        break;
      case 'Lname':
        setLnameError('');
        break;
      case 'email':
        setEmailError('');
        break;
      case 'password':
        setPasswordError('');
        break;
      case 'course':
        setCourseError('');
        break;
      default:
        break;
    }
  };

  const handleInputChange = (input, value) => {
    switch (input) {
      case 'stdnum':
        setStdnum(value);
        break;
      case 'Fname':
        setFname(value);
        break;
      case 'Lname':
        setLname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'course':
        setCourse(value);
        break;
      default:
        break;
    }
  };

  const checkRequired = () => {
    const prefix = stdnum.slice(0, 3);
    if (stdnum.trim() === '') {
      showError('stdnum', '*Student Number is required');
    } else if (stdnum.length === 11) {
      if (prefix === 'S20' || prefix === 's20') {
        showSuccess('stdnum');
      }
    } else {
        showError('stdnum', '*Student Number is invalid');
    }
  
    if (Fname.trim() === '') {
      showError('Fname', '*First Name is required');
    } else {
      showSuccess('Fname');
    }

    if (Lname.trim() === '') {
      showError('Lname', '*Last Name is required');
    } else {
      showSuccess('Lname');
    }

    if (email.trim() === '') {
      showError('email', '*Email is required');
    } else {
      showSuccess('email');
    }

    if (password.trim() === '') {
      showError('password', '*Password is required');
    } else {
      showSuccess('password');
    }

    if (course.length === 0) {
      showError('course', '*Course is required');
    } else {
      showSuccess('course');
    }

    return !(stdnum.trim() !== '' && Fname.trim() !== '' && Lname.trim() !== '' && email.trim() !== '' && password.trim() !== '' && stdnum.length === 11 && (prefix === 'S20' || prefix === 's20') && course.length !== 0);
  };

  function updateEmailInput(value) {
    setEmailInputValue(`${value}@firstasia.edu.ph`);
    handleInputChange('email', emailInputValue);
  }

  const toUpperCase = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const toLowerCase = (input) => {
    return input.charAt(0).toLowerCase() + input.slice(1);
  };

  return {
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
  };
};

export default useFormValidation;
=======
import { useState, useEffect } from 'react';

const useFormValidation = () => {
  const [stdnum, setStdnum] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailInputValue, setEmailInputValue] = useState('');

  const [stdnumError, setStdnumError] = useState('');
  const [FnameError, setFnameError] = useState('');
  const [LnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {

    setEmail(emailInputValue);
    console.log("Email: ", emailInputValue);

  }, [emailInputValue]);

  const showError = (input, message) => {
    switch (input) {
      case 'stdnum':
        setStdnumError(message);
        break;
      case 'Fname':
        setFnameError(message);
        break;
      case 'Lname':
        setLnameError(message);
        break;
      case 'email':
        setEmailError(message);
        break;
      case 'password':
        setPasswordError(message);
        break;
      default:
        break;
    }
  };

  const showSuccess = (input) => {
    switch (input) {
      case 'stdnum':
        setStdnumError('');
        break;
      case 'Fname':
        setFnameError('');
        break;
      case 'Lname':
        setLnameError('');
        break;
      case 'email':
        setEmailError('');
        break;
      case 'password':
        setPasswordError('');
        break;
      default:
        break;
    }
  };

  const handleInputChange = (input, value) => {
    switch (input) {
      case 'stdnum':
        setStdnum(value);
        break;
      case 'Fname':
        setFname(value);
        break;
      case 'Lname':
        setLname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const checkRequired = () => {
    const prefix = stdnum.slice(0, 3);
    if (stdnum.trim() === '') {
      showError('stdnum', '*Student Number is required');
    } else if (stdnum.length === 11) {
      if (prefix === 'S20') {
        showSuccess('stdnum');
      }
    } else {
        showError('stdnum', '*Student Number is invalid');
    }
  
    if (Fname.trim() === '') {
      showError('Fname', '*First Name is required');
    } else {
      showSuccess('Fname');
    }

    if (Lname.trim() === '') {
      showError('Lname', '*Last Name is required');
    } else {
      showSuccess('Lname');
    }

    if (email.trim() === '') {
      showError('email', '*Email is required');
    } else {
      showSuccess('email');
    }

    if (password.trim() === '') {
      showError('password', '*Password is required');
    } else {
      showSuccess('password');
    }

    return !(stdnum.trim() !== '' && Fname.trim() !== '' && Lname.trim() !== '' && email.trim() !== '' && password.trim() !== '' && stdnum.length === 11 && prefix === 'S20');
  };

  function updateEmailInput(value) {
    setEmailInputValue(`${value}@firstasia.edu.ph`);
    handleInputChange('email', emailInputValue);
  }

  const toUpperCase = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const toLowerCase = (input) => {
    return input.charAt(0).toLowerCase() + input.slice(1);
  };

  return {
    stdnum,
    Fname,
    Lname,
    email,
    password,
    emailInputValue,
    stdnumError,
    FnameError,
    LnameError,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
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
    updateEmailInput
  };
};

export default useFormValidation;
>>>>>>> 8a25c24a465c946ccc3eb2912e5b019c09cc4c86
