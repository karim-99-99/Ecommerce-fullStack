import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Enhanced Navigation */}
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
                <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {token ? (
                <>
                  <Link
                    to="/add-item"
                    className="hidden sm:inline-block px-4 py-2 text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    Sell
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Shop <span className="text-orange-600">House</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                Whatever you wish,<br />
                you will find in our store
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/service"
                className="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold text-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                🛒 Browse Products
              </Link>
              {token && (
                <Link
                  to="/add-item"
                  className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-600 rounded-xl font-semibold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  💰 Sell Products
                </Link>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl transform rotate-3 opacity-20"></div>
            <img
              src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
              alt="e-commerce"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600">Safe and encrypted payment processing</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
            <p className="text-gray-600">Curated selection of premium items</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
