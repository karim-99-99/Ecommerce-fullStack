// import React from "react";
// import { Link } from "react-router-dom";

// const Dinamic = () => {
//   const handlechange = (e) => {
//     const value = e.target.value;
//     if (value) window.location.href = value;
//   };
//   return (
//     <div>
//       <nav className="hidden sm:grid grid-cols-3 w-80 ml-auto text-orange-600 text-xl font-semibold ">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/service">Service</Link>
//       </nav>
//       <select
//         onChange={handlechange}
//         className="sm:hidden w-10 mt-2 p-2 border"
//       >
//         <option value="/">Home</option>
//         <option value="/about">About</option>
//         <option value="/service">service</option>
//       </select>
//     </div>
//   );
// };
// export default Dinamic;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

const Dinamic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu after navigation
  };

  return (
    <div className="w-full px-4 pt-4">
      {/* Desktop Nav */}
      <nav className="hidden sm:flex justify-end gap-8 text-orange-600 text-xl font-semibold">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/service">Service</Link>
      </nav>

      {/* Mobile Hamburger Icon */}
      <div className="sm:hidden flex justify-start items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-orange-600 p-2"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50 transition-transform duration-300 transform translate-x-0">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Menu</h2>
          <ul className="space-y-4 text-xl text-orange-600">
            <li>
              <button onClick={() => handleNavigation("/")} className="w-full text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/about")} className="w-full text-left">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/service")} className="w-full text-left">
                Service
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dinamic;
