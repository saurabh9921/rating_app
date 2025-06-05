import React from "react";
import SideBar from "./SideBar";
import { Grid } from "smart-webcomponents-react/grid";
import "smart-webcomponents-react/source/styles/smart.default.css";

function ViewUsers() {
  // Create a new field `displayRating` that will only show value for storeOwners
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
      rating: 4.2   ,
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

  // Add a `displayRating` field based on the role
  const formattedUsers = users.map((user) => ({
    ...user,
    displayRating: user.role === "storeOwner" && user.rating ? user.rating.toFixed(1) : "",
  }));

  const columns = [
    { label: "ID", dataField: "id", dataType: "number" },
    { label: "Name", dataField: "name", dataType: "string" },
    { label: "Email", dataField: "email", dataType: "string" },
    { label: "Address", dataField: "address", dataType: "string" },
    { label: "Role", dataField: "role", dataType: "string" },
    { label: "Rating", dataField: "displayRating", dataType: "string" },
  ];

  const dataSource = new window.Smart.DataAdapter({
    dataSource: formattedUsers,
    dataFields: [
      "id: number",
      "name: string",
      "email: string",
      "address: string",
      "role: string",
      "rating: number",
      "displayRating: string",
    ],
  });

  return (
    <>
      <SideBar />
      <div style={{ padding: 24, marginLeft: "220px" }}>
        <h4 style={{ textAlign: "center" }}>User List</h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            dataSource={dataSource}
            columns={columns}
            sorting={{ enabled: true }}
            filtering={{ enabled: true }}
            grouping={{ enabled: true }}
            selection={{ enabled: true }}
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </>
  );
}

export default ViewUsers;
