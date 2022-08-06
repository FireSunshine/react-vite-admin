import React from 'react';
import LayoutPanel from './layout';
import Login from './login/Login';

const Dashboard = () => {
  const token = window.localStorage.getItem('token');
  return <>{token ? <LayoutPanel /> : <Login />}</>;
};

export default Dashboard;
