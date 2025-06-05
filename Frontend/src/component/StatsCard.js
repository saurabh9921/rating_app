import React from 'react';
import './StatusCard.css';
const StatsCard = ({ title, value,icon }) => {
  return (
      <div className="stats-card">
      <div className="icon-circle">
        <i className={`bi ${icon}`} style={{ fontSize: '24px' }}></i>
      </div>
      <div className="stats-content">
        <h4 className="stats-title">{title}</h4>
        <h2 className="stats-value">{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
