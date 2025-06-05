import React, { useState,useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import StatsCard from './StatsCard';

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dummyData = {
  2023: {
    Users: [5, 10, 8, 12, 15, 20, 18, 25, 23, 28, 30, 35],
    Stores: [2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 16, 18],
    Ratings: [10, 20, 18, 25, 30, 35, 40, 50, 60, 65, 70, 80]
  },
  2024: {
    Users: [6, 11, 9, 13, 16, 22, 19, 27, 25, 30, 33, 38],
    Stores: [3, 5, 6, 7, 8, 10, 12, 14, 16, 17, 19, 20],
    Ratings: [12, 22, 20, 28, 33, 38, 44, 55, 65, 70, 75, 85]
  }
};

const DashboardChart = () => {
  const [selected, setSelected] = useState("Users");
  const [year, setYear] = useState("2024");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('access_token'); // or sessionStorage.getItem('token')

        const response = await fetch('http://localhost:3000/dashboard/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data); // { totalUsers: 2, totalStores: 0, totalRatings: 0 }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error.message);
      }
    };

    fetchStats();
  }, []);

  const chartData = monthLabels.map((month, index) => ({
    month,
    count: dummyData[year][selected][index],
  }));

  return (
    <div style={{ padding: '24px' }}>
      {/* Cards */}
      <div className="d-flex gap-4 mb-4">
        <StatsCard title="Total Users" value={stats.totalUsers} icon="bi-people-fill" />
<StatsCard title="Total Stores" value={stats.totalStores} icon="bi-shop" />
<StatsCard title="Total Ratings" value={stats.totalRatings} icon="bi-star-fill" />

      </div>

      {/* Chart Section */}
      <div style={{
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        {/* Chart Title Centered */}
        <h4 style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: 0,
          fontWeight: 'bold',
          color: '#444'
        }}>
          Monthly {selected} Overview
        </h4>
        {/* Combined Dropdowns on Right Side */}
<div style={{
  position: 'absolute',
  top: '16px',
  right: '24px',
  display: 'flex',
  gap: '12px'
}}>
  {/* Category Dropdown */}
  <select
    value={selected}
    onChange={e => setSelected(e.target.value)}
    style={{
      padding: '6px 10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      backgroundColor: '#f9f9f9'
    }}
  >
    <option value="Users">Users</option>
    <option value="Stores">Stores</option>
    <option value="Ratings">Ratings</option>
  </select>

  {/* Year Dropdown */}
  <select
    value={year}
    onChange={e => setYear(e.target.value)}
    style={{
      padding: '6px 10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      backgroundColor: '#f9f9f9'
    }}
  >
    <option value="2024">2024</option>
    <option value="2023">2023</option>
  </select>
</div>


        

        {/* Right Dropdown (Users/Stores/Ratings) */}
       

        {/* Chart */}
        <div style={{ marginTop: '60px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} barSize={35} />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
