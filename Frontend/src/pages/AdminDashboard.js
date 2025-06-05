import React, { useState } from 'react';
import StatsCard from '../component/StatsCard';
import DashboardChart from '../component/DashboardChart';
import SideBar from '../component/SideBar';
import Devendra from '../component/Devendra';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 120,
    totalStores: 45,
    totalRatings: 250,
  });

  return (
   <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}>
        <h3 className="mb-4" style={{marginLeft:'20px', fontWeight:'700'}}> Dashboard</h3>
        

        {/* Top Stats Cards */}
        {/* <div className="d-flex gap-4 mb-4">
          <StatsCard title="Total Users" value={stats.totalUsers} />
          <StatsCard title="Total Stores" value={stats.totalStores} />
          <StatsCard title="Total Ratings" value={stats.totalRatings} />
        </div> */}

        {/* Bar Chart */}
        <DashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
