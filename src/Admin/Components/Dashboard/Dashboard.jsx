import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard_Home from '../Dashboard_Home/Dashboard_Home';
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
        <div className=''>
              <div>
                <Dashboard_Home/>
              </div>
        </div>
    </div>
  );
}

export default Dashboard;
