import React from "react";
import { useState } from "react";
import SideBar from "./SideBar";
import "./AddUser.css"
import Select from 'react-select';
import Swal from "sweetalert2";
import Spinner from 'react-bootstrap/Spinner';
function AddUser() {

     

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

    
    const aquaticCreatures = [
 
  { label: 'Normal User', value: 'USER' },
  { label: 'Store Owner', value: 'STORE_OWNER' },
  
];

const handleSubmit = async (e) => {
  e.preventDefault();
  debugger
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
    name: userName,
    email: email,
    address: address,
    password: password,
    role: selectedRole.value
  };

  try {
    setLoading(true);
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (response.ok) {
      setFlag(true);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User registered successfully!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message || "Registration failed."
      });
    }

  } catch (err) {
    console.error("Error registering user:", err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: "An error occurred while registering."
    });
  } finally {
    setLoading(false);
  }
};


function isPasswordValid(password) {
  const lengthValid = password.length >= 8 && password.length <= 16;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  return lengthValid && hasUppercase && hasSpecialChar;
}

  return (
    <>
        <SideBar/>
        
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


          <div className="mb-3 input-group">
            <span className="input-group-text">
             <i class="bi bi-person-workspace"></i>
            </span>
            <div style={{width:'399px'}}>

            <Select
            
              options={aquaticCreatures}
              value={selectedRole}
            onChange={setSelectedRole}
              />
            </div>
          </div>

         <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary" style={{textAlign:'center'}} disabled={loading}>
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Add User"
            )}
          </button>
          {flag ? (
            <div></div>
          ) : (
            errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )
          )}

  </div>  
          
        </form>
        
      </div>
    </>
  );
}

export default AddUser;
