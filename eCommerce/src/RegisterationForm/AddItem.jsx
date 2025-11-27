import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addProduct, fetchCategories } from "../services/api";

function AddItem() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock_quantity: "",
    photos: [],
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [photoPreviews, setPhotoPreviews] = useState([]);

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
    if (!input.price || parseFloat(input.price) <= 0) {
      newErrors.price = "Please enter a valid price";
      isValid = false;
    }
    if (!input.stock_quantity || parseInt(input.stock_quantity) < 0) {
      newErrors.stock_quantity = "Please enter a valid number of items";
      isValid = false;
    }
    if (!input.photos || input.photos.length === 0) {
      newErrors.photos = "Please upload at least one photo";
      isValid = false;
    }

    setError(newErrors);
    if (!isValid) return;

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", parseFloat(input.price));
      formData.append("stock_quantity", parseInt(input.stock_quantity));
      formData.append("category_id", Number(input.category));
      
      // Append the first photo as the main image
      if (input.photos.length > 0) {
        formData.append("image", input.photos[0]);
        
        // Append remaining photos as additional images
        for (let i = 1; i < input.photos.length; i++) {
          formData.append("images", input.photos[i]);
        }
      }

      await addProduct(formData);
      setSuccessMessage("✅ Product added successfully!");
      setInput({ name: "", description: "", category: "", price: "", stock_quantity: "", photos: [] });
      setPhotoPreviews([]);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      setError({
        submit: "Failed to add product. Make sure you're logged in.",
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

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (!file.type.match("image.*")) {
        setError((prev) => ({ ...prev, photos: "Please select valid image files" }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError((prev) => ({ ...prev, photos: "File size must be less than 5MB" }));
        return;
      }

      validFiles.push(file);
      const previewUrl = URL.createObjectURL(file);
      newPreviews.push({ file, preview: previewUrl });
    });

    if (validFiles.length > 0) {
      setInput((prev) => ({ ...prev, photos: [...prev.photos, ...validFiles] }));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
      setError((prev) => ({ ...prev, photos: "" }));
    }
  };

  const removePhoto = (index) => {
    const newPhotos = input.photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    
    // Revoke object URL to free memory
    URL.revokeObjectURL(photoPreviews[index].preview);
    
    setInput((prev) => ({ ...prev, photos: newPhotos }));
    setPhotoPreviews(newPreviews);
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
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={input.price}
                onChange={handleChange}
                placeholder="Enter price (e.g., 99.99)"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {error?.price && <p className="mt-1 text-sm text-red-500">{error.price}</p>}
            </div>

            <div>
              <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Items <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={input.stock_quantity}
                onChange={handleChange}
                placeholder="Enter number of items"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {error?.stock_quantity && <p className="mt-1 text-sm text-red-500">{error.stock_quantity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Photos <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <p className="mt-2 text-sm text-gray-500">You can select multiple photos (max 5MB each)</p>
                
                {photoPreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photoPreviews.map((item, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={item.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center rounded-b-lg">
                          Photo {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {error?.photos && <p className="mt-1 text-sm text-red-500">{error.photos}</p>}
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
