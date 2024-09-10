import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Saidbar from '../Saidbar/Saidbar';
import Dashboard_Home from '../Dashboard_Home/Dashboard_Home';
import Category from '../Category/Category';
import Product from '../Product/Product';
import Add_blog from '../Add_blog/Add_blog';

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
