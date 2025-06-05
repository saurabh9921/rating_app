import React, { useState, useEffect } from 'react';
import {
  Home, Star, BarChart3, Settings,
  Users, TrendingUp, Menu, LogOut, X,Key
} from 'lucide-react';
import './NormalUserSideBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NormalUserSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/rateStore' },
    // { id: 'ratings', label: 'All Ratings', icon: Star, path: '/user/ratings' },
    // { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/user/analytics' },
    // { id: 'trending', label: 'Trending', icon: TrendingUp, path: '/user/trending' },
    // { id: 'users', label: 'Users', icon: Users, path: '/user/users' },
    // { id: 'settings', label: 'Settings', icon: Settings, path: '/user/settings' },
    
     { id: 'updatePass', label: 'Update Password', icon: Key, path: '/updatePass' },
    { id: 'logout', label: 'Logout', icon: LogOut, path: '/' }
  ];

  // Sync activeItem with current route
  useEffect(() => {

    // navigate('/rateStore')
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemId) => {
    if (itemId === 'logout') {
      localStorage.clear();
      navigate('/');
    } else {
      setActiveItem(itemId);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Star className="logo-icon" />
          {isOpen && <span className="logo-text">RateApp</span>}
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-menu-item">
              <Link
                to={item.path}
                className={`sidebar-link ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <item.icon className="sidebar-icon" size={20} />
                {isOpen && <span className="sidebar-text">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <Users size={20} />
            </div>
            <div className="user-info">
              <p className="user-name">John Doe</p>
              <p className="user-role">User</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalUserSideBar;
