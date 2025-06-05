import { useState } from "react";
import SideBar from "./SideBar";
import "./AddUser.css"
import UserLogin from "./UserLogin";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate()
     const [userName,setFullName] = useState("")
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [confirmPassword,setConfirmPassword] = useState("")
        const [address,setAddress] = useState("")
        const [pinCode,setPincode] = useState("")
        const[phoneNum,setPhoneNum] = useState("")
        const [errorMessage,setErrorMessgae] = useState("")
        const [flag,setFlag] =useState(false) 
        const [selectedRole, setSelectedRole] = useState(null);
    
    
        
        const [loading, setLoading] = useState(false); // Loader state
    
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
    
        
      
    
    const handleSubmit = (e) => {
      debugger
      e.preventDefault(); // prevent page reload
        setLoading(true)
      
    
      if (!isPasswordValid(password)) {
        setErrorMessgae("Password must be 8-16 characters, include at least one uppercase letter and one special character.");
         setTimeout(() => setErrorMessgae(""), 4000);
        return;
      }
    
      if (!selectedRole) {
        setErrorMessgae("Please select a user role.");
         setTimeout(() => setErrorMessgae(""), 4000);
        return;
      }
    
    
      const userData = {
        userName,
        email,
        address,
        password,
        role: selectedRole?.label, 
      };
    }
    
    function isPasswordValid(password) {
      const lengthValid = password.length >= 8 && password.length <= 16;
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    
      return lengthValid && hasUppercase && hasSpecialChar;
    }
    
  return (
    <>
        
        
      <div className="signup-container">
        {/* <h2 className="heading">Bookstore</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              minLength={20}
              max={60}
              value={userName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

           <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-house-door-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              maxLength={400}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          

          <div className="mb-3 input-group">
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


         

          <span className=""></span>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Sign Up"
            )}
          </button>
          {flag ? (
            <div></div>
          ) : (
            errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )
          )}

          
        </form>
         <p className="login-link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}>
                        Already have an account? <Link to={UserLogin}>Login</Link>
                    </p>
        
      </div>
    </>
  )
}

export default SignUp
