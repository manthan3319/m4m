import React from 'react';
import { Link } from 'react-router-dom';
import { logo2 } from '../../../components/Images/Images';

// Define an array of link objects
const links = [
  { path: '/dashboardhome', label: 'Home' },
  { path: '/addcategory', label: 'Category' },
  { path: '/product', label: 'Product' },
  { path: '/addblog', label: 'Blog' },
  { path: '/Add_Our_Culture', label: 'Our Culture' },
  { path: '/addaboutus', label: 'About Us' }
];

const Saidbar = () => {
  return (
    <div className='w-[250px] bg-black h-screen fixed top-0 left-0  py-4'>
      <div className='mb-[10px]  border-b-[1px] pb-[10px]'>
       <Link to="/dashboardhome"> <img src={logo2} className='w-[150px] logo_filter' alt='logo' /></Link>
      </div>
      <ul className='list-none  m-0 px-4'>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className='block text-white text-[22px] py-2 px-2  hover:bg-gray-700 font-lato'>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Saidbar;
