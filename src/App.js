import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import About_Us from "./components/About_Us/About_Us";
import ShopeLocation from "./components/ShopeLocation/ShopeLocation";
import Home_Gallery from "./components/Home_Gallery/Home_Gallery";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import Home_Blog from "./components/Home_Blog/Home_Blog";
import Chatbox from "./components/Chatbox/Chatbox";
import Login from "./Admin/Components/Login/Login";
import Dashboard from "./Admin/Components/Dashboard/Dashboard";
import Dashboard_Home from "./Admin/Components/Dashboard_Home/Dashboard_Home";
import Category from "./Admin/Components/Category/Category";
import Product from "./Admin/Components/Product/Product";
import Add_blog from "./Admin/Components/Add_blog/Add_blog";
import Add_Our_Culture from "./Admin/Components/Add_Our_Culture/Add_Our_Culture";
import AddAboutus from "./Admin/Components/AddAboutus/AddAboutus";

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on every render
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const hideNavbarAndFooter = location.pathname.startsWith('/dashboard') ||
                              location.pathname.startsWith('/addcategory') ||
                              location.pathname.startsWith('/product') ||
                              location.pathname.startsWith('/addblog') ||
                              location.pathname.startsWith('/Add_Our_Culture') ||
                              location.pathname.startsWith('/login')||
                              location.pathname.startsWith('/addaboutus');

  const showChatbox = !hideNavbarAndFooter;

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<About_Us />} />
        <Route path="/location" element={<ShopeLocation />} />
        <Route path="/gallery" element={<Home_Gallery />} />
        <Route path="/blog" element={<Home_Blog />} />
        <Route path="/category" element={<CategoryDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboardhome" element={isAuthenticated ? <Dashboard_Home /> : <Navigate to="/login" />} />
        <Route path="/addcategory" element={isAuthenticated ? <Category /> : <Navigate to="/login" />} />
        <Route path="/product" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
        <Route path="/addblog" element={isAuthenticated ? <Add_blog /> : <Navigate to="/login" />} />
        <Route path="/addaboutus" element={isAuthenticated ? <AddAboutus /> : <Navigate to="/login" />} />
        <Route path="/Add_Our_Culture" element={isAuthenticated ? <Add_Our_Culture /> : <Navigate to="/login" />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
      {showChatbox && <Chatbox />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
