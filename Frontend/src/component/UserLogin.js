import React from 'react'
import './UserLogin.css';
import axios from 'axios';
// import "./UserLogin.css"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useState } from 'react';
// import UserDetails from './UserDetails';

// import Navbar from './Navbar';
import SignUp from './SignUp';
function UserLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function togglePasswordVisibility(inputId, iconId) {

        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");
        } else {
            input.type = "password";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
        }
    }

    const validateEmailPassword = async (e) => {
        
        e.preventDefault();  // Prevent form reload
        debugger
        try {
            const response = await axios.post("http://localhost:3000/auth/login",
                {
                    email: email,
                    password: password
                },
              
            );

            console.log("USer response is ",response);
            
            if (response.status === 200 || response.status === 201 ) {  
               
                

                // console.log("fullname is "+firstName);
                localStorage.setItem("id",response.data.id)
                localStorage.setItem("role",response.data.role)
                localStorage.setItem("access_token",response.data.access_token)
                
                // setUsername(localStorage.getItem("username"))
                navigate("/roleBasedLayout")
                console.log("User Present");

            }
            if (response.status === 404) {  
                // setIsLoggedIn(false)
                setErrorMessage("Email Id Not Found!");
            }
            console.log(response);

        } catch (error) {
            console.log("error is "+error);

            // Handling any errors from the server
            if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid email or password!");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
        setTimeout(() => {
            setErrorMessage("")
        }, 3000)
    }
  return (
    <>
       <div className="signup-container" id='signIn'>
                <h2 className="heading" id='myHeading'>Login</h2>
                <form onSubmit={validateEmailPassword} id='loginForm'>

                    <div className="mb-4 input-group">
                        <span className="input-group-text">
                            <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />
                    </div>
                    <span className="" ></span>
                    <div className="mb-4 input-group">
                        <span className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required

                        />
                        <span
                            className="input-group-text"
                            onClick={() =>
                                togglePasswordVisibility("password", "togglePasswordIcon")
                            }
                        >
                            <i className="bi bi-eye-slash" id="togglePasswordIcon"></i>
                        </span>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" id='signinBtn'>
                        Sign in
                    </button>
                    <p className="login-link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/signUp');
                    }}>
                        Don't have an account? <Link to={SignUp}>Sign up as a Normal User</Link>
                    </p>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3">{errorMessage}</div>
                    )}
                </form>
            </div>
    </>
  )
}

export default UserLogin
