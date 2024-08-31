import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/aboutus" element={<About_Us />}></Route>
        <Route path="/location" element={<ShopeLocation />}></Route>
        <Route path="/gallery" element={<Home_Gallery />}></Route>
        <Route path="/blog" element={<Home_Blog />}></Route>
        <Route path="/category/:categoryName" element={<CategoryDetails />} />
      </Routes>
      <Footer/>
      <Chatbox/>
    </BrowserRouter>
  );
};

export default App;
