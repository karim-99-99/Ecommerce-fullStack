import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UploadPhoto from "../Features/UploadPhoto";
import { addProduct, fetchCategories } from "../services/api";

function AddItem() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    Photo: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!input.name.trim()) {
      newErrors.name = "Please enter a name";
      isValid = false;
    }
    if (!input.description.trim()) {
      newErrors.description = "Please enter a description";
      isValid = false;
    }
    if (!input.category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }
    if (!input.Photo) {
      newErrors.Photo = "Please upload a photo";
      isValid = false;
    }

    setError(newErrors);
    if (!isValid) return;

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", 10);
      formData.append("stock_quantity", 1);
      formData.append("category_id", Number(input.category)); // ensure number
      formData.append("image", input.Photo);

      await addProduct(formData);
      setSuccessMessage("✅ Product added successfully!");
      setInput({ name: "", description: "", category: "", Photo: "" });
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      setError({
        submit: "Failed to add product. Make sure you’re logged in.",
      });
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories:", err.message);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

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
                <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sell Your <span className="text-orange-600">Product</span>
            </h1>
            <p className="text-gray-600">Fill in the details below to list your product</p>
          </div>

          {error?.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error.submit}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {error?.name && <p className="mt-1 text-sm text-red-500">{error.name}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              />
              {error?.description && <p className="mt-1 text-sm text-red-500">{error.description}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={input.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {error?.category && <p className="mt-1 text-sm text-red-500">{error.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Photo <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-500 transition-colors">
                <UploadPhoto
                  onPhotoSelect={(file) =>
                    setInput((prev) => ({ ...prev, Photo: file }))
                  }
                />
              </div>
              {error?.Photo && <p className="mt-1 text-sm text-red-500">{error.Photo}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mt-8"
            >
              List Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
