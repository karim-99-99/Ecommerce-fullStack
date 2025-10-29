import React from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <div>
      <nav className="grid grid-cols-3 md:w-80 ml-auto text-orange-600 text-xl font-semibold pb-10">
        <Link to="/">Home</Link>
        <Link to="/Service">Service</Link>
        <Link to="/About">About</Link>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:m-16 lg:-mt-10 ">
        <p className="flex justify-center lg:m-16 md:text-lg font-semibold ">
          Our e-commerce platform offers a wide range of products including
          electronics, fashion, home goods, and more — all in one place. We
          provide a convenient, secure, and fast shopping experience with
          detailed product information, customer reviews, and multiple payment
          options. Customers enjoy regular discounts, free shipping on select
          orders, and easy return policies to ensure satisfaction with every
          purchase.
        </p>
        <img
          src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
          alt="e-commerce Company"
          className="rounded-xl lg:h-96 md:ml-10 md:mt-28 lg:mt-10 md:mr-10 h-auto w-auto "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14 pr-6 ">
        <span className="flex flex-col justify-center items-center">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_960_720.jpg"
            alt="ceo photo"
            className="rounded-full h-28 md:h-52 w-28 md:w-56 ml-10 "
          />
          <div className="pt-5 pl-9">
          <p className="md:text-xl font-semibold ">Adam Khalil</p>
          <p className="font-semibold">CEO</p>
          </div>
        </span>
        <span className="flex flex-col justify-center items-center">
          <img
            src="https://images.hindustantimes.com/tech/img/2023/01/19/1600x900/AI_generated_art_1674113313038_1674113318035_1674113318035.jpg"
            alt="coo photo"
            className="rounded-full h-28 md:h-52 w-28 md:w-56 ml-10 "
          />
          <div className="pt-5 pl-9">
          <p className="md:text-xl font-semibold">Lina Saeed</p>
          <p className="font-semibold">COO</p>
          </div>
        </span>
        <span className="flex flex-col justify-center items-center">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/08/14/02/ai-generated-7776701_640.jpg"
            alt="cmo photo"
            className="rounded-full h-28 md:h-52 w-28 md:w-56 ml-10"
          />
          <div className="pt-5 pl-9 ">
          <p className="md:text-xl font-semibold"> Omar Hassan</p>
          <p className="font-semibold">CMO</p>
          </div>
        </span>
      </div>
      <div className="m-14 flex flex-col justify-center items-center">
        <h2 className="border-2   p-5 rounded-3xl bg-orange-500 text-3xl font-semibold text-white font-serif mb-3">Customer Opinion</h2>
        <p className="border-1 border-black mt-2 p-3  bg-white text-l font-semibold text-black rounded-lg mb-3">Great variety of products and fast delivery.</p>
        <p className="border- border-black mt-2 p-3  bg-white text-l font-semibold text-black rounded-lg mb-3">Easy to use website with good deals.</p>
        <p className="border- border-black mt-2 p-3  bg-white text-l font-semibold text-black rounded-lg">Reliable service and smooth shopping experience.</p>
        <p className="border- border-black mt-2 p-3  bg-white text-l font-semibold text-black rounded-lg">..............</p>
      </div>
    </div>
  );
}

export default About;
