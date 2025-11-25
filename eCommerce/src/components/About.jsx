import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Enhanced Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                ShopHouse
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  Home
                </Link>
                <Link to="/service" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  Products
                </Link>
                <Link to="/about" className="text-orange-600 font-medium">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              About <span className="text-orange-600">ShopHouse</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our e-commerce platform offers a wide range of products including
              electronics, fashion, home goods, and more — all in one place. We
              provide a convenient, secure, and fast shopping experience with
              detailed product information, customer reviews, and multiple payment
              options. Customers enjoy regular discounts, free shipping on select
              orders, and easy return policies to ensure satisfaction with every
              purchase.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl transform rotate-3 opacity-20"></div>
            <img
              src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
              alt="e-commerce Company"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="relative inline-block mb-4">
                <img
                  src="https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_960_720.jpg"
                  alt="CEO"
                  className="rounded-full h-32 w-32 object-cover mx-auto border-4 border-orange-100"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Adam Khalil</h3>
              <p className="text-orange-600 font-semibold">CEO</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="relative inline-block mb-4">
                <img
                  src="https://images.hindustantimes.com/tech/img/2023/01/19/1600x900/AI_generated_art_1674113313038_1674113318035_1674113318035.jpg"
                  alt="COO"
                  className="rounded-full h-32 w-32 object-cover mx-auto border-4 border-orange-100"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Lina Saeed</h3>
              <p className="text-orange-600 font-semibold">COO</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="relative inline-block mb-4">
                <img
                  src="https://cdn.pixabay.com/photo/2023/02/08/14/02/ai-generated-7776701_640.jpg"
                  alt="CMO"
                  className="rounded-full h-32 w-32 object-cover mx-auto border-4 border-orange-100"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Omar Hassan</h3>
              <p className="text-orange-600 font-semibold">CMO</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            What Our <span className="text-orange-600">Customers</span> Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <p className="text-gray-700 font-medium mb-4">
                "Great variety of products and fast delivery. Highly recommended!"
              </p>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <p className="text-gray-700 font-medium mb-4">
                "Easy to use website with good deals. Love shopping here!"
              </p>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <p className="text-gray-700 font-medium mb-4">
                "Reliable service and smooth shopping experience. Will shop again!"
              </p>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <p className="text-gray-700 font-medium mb-4">
                "Best online store I've used. Quality products and excellent customer service!"
              </p>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
