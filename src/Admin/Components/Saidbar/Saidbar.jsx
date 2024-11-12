import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo2 } from '../../../components/Images/Images';
import Drawer from 'react-modern-drawer'

// Define an array of link objects
const links = [
  { path: '/dashboardhome', label: 'Home' },
  { path: '/addcategory', label: 'Category' },
  { path: '/product', label: 'Product' },
  { path: '/addblog', label: 'Blog' },
  { path: '/Add_Our_Culture', label: 'Our Culture' },
  { path: '/chatboxque', label: 'Chat box Que' },
  { path: '/ourshoplocation', label: 'Our Shop Location' },
  { path: '/addaboutus', label: 'About Us' },
  { path: '/ContactDetails', label: 'Update Contact' }
];

const Saidbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <div className='hidden sm:block sm:w-[250px] w-[100%] bg-black h-screen fixed top-0 left-0 pt-4'>
        <div className='mb-[10px] border-b-[1px] pb-[10px]'>
          <Link to="/dashboardhome">
            <img src={logo2} className='w-[150px] filter invert brightness-0' alt='logo' />
          </Link>
        </div>
        <ul className='list-none m-0 px-4'>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className='block text-white text-[22px] py-2 px-2 hover:bg-gray-700 hover:rounded-lg font-lato'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className='mt-[30px]'>
          <button
            onClick={handleLogout}
            className='block text-black font-bold  bg-white w-[190px] text-[22px] py-2 px-2 border-l-8 rounded-r-md border-gray-400 hover:bg-gray-500 hover:text-white font-lato text-left'
          >
            Log out
          </button>
        </div>
      </div>

      <div className='bg-white sm:hidden'>
        <div className='flex justify-between px-[20px] items-center border-b-[5px] border-black fixed z-[99] w-[100%] bg-white py-[15px]'>
          <div>
            <Link to="/dashboardhome">
              <img src={logo2} className='w-[150px] ' alt='logo' />
            </Link>
          </div>
          <div>
            <button onClick={toggleDrawer} className='text-[35px]'> <i class="fa fa-bars" aria-hidden="true"></i></button>
          </div>
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='right'
          className='bla bla bla'
        >
          <div>
            <ul className='list-none m-0 px-4'>
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className='block text-black text-[22px] py-2 px-2 hover:bg-gray-700 hover:rounded-lg font-lato'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className='mt-[30px]'>
              <button
                onClick={handleLogout}
                className='block text-white font-bold  bg-black w-[190px] text-[22px] py-2 px-2 border-l-8 rounded-r-md border-gray-400 hover:bg-gray-500 hover:text-white font-lato text-left'
              >
                Log out
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Saidbar;
