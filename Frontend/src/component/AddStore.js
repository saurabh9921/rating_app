import React from "react";
import { useState } from "react";
import SideBar from "./SideBar";
import "./AddUser.css";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { Grid } from "smart-webcomponents-react/grid";
import "smart-webcomponents-react/source/styles/smart.default.css";
import { useRef } from "react";
import Swal from "sweetalert2";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
function AddStore() {
  const gridRef = useRef(null);

  const users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      address: "123 Admin St",
      role: "storeOwner",
      rating: 4,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      address: "456 Normal Rd",
      role: "normal",
      rating: null,
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      address: "789 Normal Ave",
      role: "storeOwner",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Diana",
      email: "diana@example.com",
      address: "101 Admin Blvd",
      role: "storeOwner",
      rating: 4.2,
    },
    {
      id: 5,
      name: "Eva",
      email: "eva@example.com",
      address: "202 Store St",
      role: "storeOwner",
      rating: 4.8,
    },
  ];

  const formattedUsers = users.map((user) => ({
    ...user,
    displayRating:
      user.role === "storeOwner" && user.rating ? user.rating.toFixed(1) : "",
  }));

  const columns = [
    { label: "ID", dataField: "id", dataType: "number" },
    { label: "Name", dataField: "name", dataType: "string" },
    { label: "Email", dataField: "email", dataType: "string" },
    { label: "Address", dataField: "address", dataType: "string" },
  ];

  const dataSource = new window.Smart.DataAdapter({
    dataSource: formattedUsers,
    dataFields: [
      "id: number",
      "name: string",
      "email: string",
      "address: string",
    ],
  });
const [storeOwners, setStoreOwners] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [userName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPincode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errorMessage, setErrorMessgae] = useState("");
  const [flag, setFlag] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rowData, setRowData] = useState(null);

  const [loading, setLoading] = useState(false); // Loader state

  const aquaticCreatures = [
    { label: "Normal User", value: "0" },
    { label: "Store Owner", value: "1" },
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage

    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    // Filter store owners only
    const owners = data.filter((user) => user.role === "STORE_OWNER");

    setStoreOwners(owners);
    setShowModal(true);
  } catch (error) {
    console.error("Error fetching users:", error);
    Swal.fire("Error", "Unable to fetch users", "error");
  } finally {
    setLoading(false);
  }
};



  const submitForm = async () => {
  if (rowData == null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select the user!",
    });
    return;
  }

  const userData = {
    name: userName,
    email: email,
    address: address,
    userId: rowData.id, // assuming this is the userId (storeOwner)
  };

  try {
    const token = localStorage.getItem("access_token"); // or sessionStorage.getItem
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "User is not logged in!",
      });
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/stores",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Store saved:", response.data);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Store added successfully!",
    });

    setShowModal(false); // close the modal
  } catch (error) {
    console.error("Error adding store:", error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.response?.data?.message || "Something went wrong!",
    });
  }
};



  

  return (
    <>
      <SideBar />

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

          

          
          {/* <div className="mb-3 input-group">
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
          </div> */}

          <span className=""></span>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Next"
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
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
  <Modal.Header closeButton>
    <Modal.Title>Select Store Owner</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Grid
      ref={gridRef}
      dataSource={new window.Smart.DataAdapter({
        dataSource: storeOwners,
        dataFields: [
          "id: number",
          "name: string",
          "email: string",
          "address: string"
        ]
      })}
      columns={[
        { label: "ID", dataField: "id", dataType: "number" },
        { label: "Name", dataField: "name", dataType: "string" },
        { label: "Email", dataField: "email", dataType: "string" },
        { label: "Address", dataField: "address", dataType: "string" }
      ]}
      selection={{ enabled: true, mode: "one" }}
      onRowClick={(event) => {
        const selectedRow = event.detail.row.data;
        setRowData(selectedRow);
      }}
    />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={submitForm}>
      Submit Store
    </Button>
  </Modal.Footer>
</Modal>

      
    </>
  );
}

export default AddStore;
