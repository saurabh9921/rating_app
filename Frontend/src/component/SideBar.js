// src/components/Sidebar.js
import React from "react";
import { FaUser, FaStore, FaStar, FaChartBar,FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate();
       const handleLogout = () => {
      localStorage.clear(); // Clear token and role
      navigate("/");   // Redirect to login page
    };
  return (
    <div
      className="bg-dark text-white p-4"
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <h2 className="text-white mb-4">Admin Panel</h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <Link to="/dashBoard" className="nav-link text-white" href="#">
            <FaChartBar className="me-2" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/addUser" className="nav-link text-white" >
            <FaUser className="me-2" />
           Add Users
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link to="/viewUser" className="nav-link text-white" >
            <FaUser className="me-2" />
            View Users 
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link to="/addStore" className="nav-link text-white" href="#">
            <FaStore className="me-2" />
            Add Store
          </Link>
        </li>
         <li className="nav-item mb-3">
          <Link to="/viewStore" className="nav-link text-white" href="#">
            <FaStore className="me-2" />
            View Stores
          </Link>
        </li>

             <li className="nav-item mb-3">
                   <button
                     onClick={handleLogout}
                     className="nav-link text-white"
                     style={{ cursor: "pointer" }}
                   >
                     <FaSignOutAlt className="me-2" />
                     Logout
                   </button>
                 </li>
      </ul>
    </div>
  );
};

export default SideBar;
