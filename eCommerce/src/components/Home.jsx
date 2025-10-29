import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen w-full ">
      <nav className="grid grid-cols-3 w-80 ml-auto text-orange-600 text-xl font-semibold ">
        <Link to="/" className="">
          Home
        </Link>
        <Link to="/service">Service</Link>
        <Link to="/about">About</Link>
        <button onClick={handleLogout} className="justify-self-end">Logout</button>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-10">
        <div className="">
          <h1 className="text-7xl md:text-8xl md:pt-20 font-bold text-left ">
            Shop <br />
            House
          </h1>
          <p className="text-2xl md:text-3xl t-8 leading-loose text-left">
            {" "}
            what ever you wish
            <br /> you will find in our store
          </p>
        </div>
        <img
          src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
          alt="e-commerce photo"
          className="rounded-3xl "
        />
      </div>

      <div className="flex gap-12 md:gap-96 justify-center pt-10 sm:gap-32 ">
        <Link
          className=" text-orange-600 text-xl font-semibold shadow-xl rounded-xl w-32  md:h-10 pt-1 bg-gray-300 w-56"
          to="/service"
        >
          Buy Products
        </Link>
        <Link
          className=" text-orange-600 text-xl font-semibold shadow-xl rounded-xl w-32  md:h-10 pt-1 bg-gray-300 w-56"
          to="/add-item"
        >
          Sell Products
        </Link>
      
        
      </div>
    </div>
  );
}

export default Home;
