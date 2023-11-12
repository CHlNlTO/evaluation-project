import supabase from "../config/supabaseClient"
import { useEffect, useState} from 'react'
//import "../css/login.css"


const Login = () => {   

    const container = document.getElementById("container")
    const classList = document.getElementById("classList")

    const registerButton = () => {
        container.classList.add("right-panel-active");
      };

    const loginButton = () => {
        container.classList.remove("right-panel-active");
      };

    //const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    useEffect(() => {
        const fetchEmail = async () => {
            const { data, error } = await supabase
            .from('admin')
            .select('username', 'password')
            .eq(document.querySelector('.email-2').value, document.querySelector('.password-2').value)

            if (error) {    
                setFetchError('Wrong input')
                setEmail(null)
                setPassword(null)
                console.log(error)
            }
            if (data) {
                console.log("Success")
                //navigate('./UserMainPage');
                
            }
        }

        fetchEmail()
    }, [])

    return (
        <div className="page landing">
            <div className="container" id="container">
                <div className="form-container register-container">
                    <form>
                    <h1 className="register-title">EVALUATION FORM</h1>
                    <div className="form-control">
                        <input type="text" id="stdnum" placeholder="Student Number" />
                        <small id="username-error"></small>
                        <span></span>
                    </div>
                    <div className="form-control">
                        <input type="text" id="Fname" placeholder="First Name" />
                        <small id="username-error"></small>
                        <span></span>
                    </div>
                    <div className="form-control">
                        <input type="text" id="Lname" placeholder="Last Name" />
                        <small id="username-error"></small>
                        <span></span>
                    </div>
                    <div className="form-control">
                        <input type="email" id="email" placeholder="Email" />
                        <small id="email-error"></small>
                        <span></span>
                    </div>
                    <div className="form-control">
                        <input type="password" id="password" placeholder="Password" />
                        <small id="password-error"></small>
                        <span></span>
                    </div>
                    <button type="submit" value="submit">Register</button>
                    </form>
                </div>

                <div className="form-container login-container">
                    <form className="form-lg">
                    <h1>EVALUATION FORM</h1>
                    <div className="form-control2">
                        <input type="email" className="email-2" placeholder="Email" />
                        <small className="email-error-2"></small>
                        <span></span>
                    </div>
                    <div className="form-control2">
                        <input type="password" className="password-2" placeholder="Password" />
                        <small className="password-error-2"></small>
                        <span></span>
                    </div>

                    <div className="content">
                        <div className="checkbox">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="">Remember me</label>
                        </div>
                        <div className="pass-link">
                        <a href="https://www.google.com">Forgot password</a>
                        </div>
                    </div>
                    <button type="submit" value="submit">Login</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="title">
                            <div>Answer quick surveys</div>
                            easily
                            </h1>
                            <button className="ghost" id="login" onClick={loginButton}>
                            Login
                            <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </div> 

                        <div className="overlay-panel overlay-right">
                            <h1 className="title">
                            <div>Manage your surveys</div>
                            with ease
                            </h1>
                            <button className="ghost" id="register" onClick={registerButton}>
                            Register
                            <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default Login;
