// RoleBasedLayout.js
import React from "react";
// import AdminSidebar from "./AdminSidebar";
// import StoreOwnerSidebar from "./StoreOwnerSidebar";
// import NormalUserSidebar from "./NormalUserSidebar";
import SideBar from "./SideBar";
import NormalUserSideBar from "../sidebars/NoramalUserSideBar";
import StoreOwnerSideBar from "../sidebars/StoreOwnerSideBar";

const RoleBasedLayout = ({ children }) => {
  const role = localStorage.getItem("role");

  const renderSidebar = () => {
    switch (role) {
      case "ADMIN":
        return <SideBar />;
      case "STORE_OWNER":
        return <NormalUserSideBar />;
      case "USER":
        return <NormalUserSideBar />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return (
    <div className="flex">
      {renderSidebar()}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default RoleBasedLayout;
