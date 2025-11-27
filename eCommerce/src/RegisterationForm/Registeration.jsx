import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductImageUrl, getPlaceholderImage } from "../utils/imageUtils";

function Registeration() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: "",
    quantity: "", // ✅ Added number of items
  });
  const [error, seterror] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get all images for the product
  const getProductImages = () => {
    if (!selectedProduct) return [];
    const images = [];
    
    // Add main image first if it exists
    if (selectedProduct.image) {
      images.push(getProductImageUrl(selectedProduct.image));
    }
    
    // Add additional images from the images array
    if (selectedProduct.images && Array.isArray(selectedProduct.images)) {
      selectedProduct.images.forEach(img => {
        const imageUrl = img.image || img;
        if (imageUrl) {
          const fullUrl = getProductImageUrl(imageUrl);
          // Avoid duplicates if main image is also in the array
          if (!images.includes(fullUrl)) {
            images.push(fullUrl);
          }
        }
      });
    }
    
    // Fallback to placeholder if no images
    if (images.length === 0) {
      images.push(getPlaceholderImage());
    }
    
    return images;
  };

  const productImages = getProductImages();

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedProduct]);

  useEffect(() => {
    // Get the selected product from sessionStorage
    const productData = sessionStorage.getItem("selectedProduct");
    if (productData) {
      setSelectedProduct(JSON.parse(productData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    // ✅ Validation
    if (!input.name.trim()) {
      newErrors.name = "Please Enter Your Name";
      isValid = false;
    }
    if (!input.email) {
      newErrors.email = "Please Enter Your Email";
      isValid = false;
    }
    if (!input.phonenumber) {
      newErrors.phonenumber = "Please Enter Your Phone Number";
      isValid = false;
    }
    if (!input.location) {
      newErrors.location = "Please Enter Your Location";
      isValid = false;
    }
    if (!input.quantity || input.quantity <= 0) {
      newErrors.quantity = "Please Enter a Valid Number of Items";
      isValid = false;
    }

    seterror(newErrors);

    if (isValid) {
      // ✅ Store registration data in sessionStorage
      const registrationData = {
        name: input.name,
        email: input.email,
        phonenumber: input.phonenumber,
        location: input.location,
        quantity: input.quantity,
        product: selectedProduct,
        timestamp: new Date().toISOString(),
      };

      const existingRegistrations = JSON.parse(
        sessionStorage.getItem("registrations") || "[]"
      );
      existingRegistrations.push(registrationData);
      sessionStorage.setItem(
        "registrations",
        JSON.stringify(existingRegistrations)
      );

      // ✅ Prepare WhatsApp message
      const message = `Hello, I just registered for the product: ${
        selectedProduct?.name || "N/A"
      }.
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phonenumber}
Location: ${input.location}
Quantity: ${input.quantity}`;

      // ✅ Replace this with your real WhatsApp number (include country code, no '+')
      const whatsappNumber = "+201126811159"; // Example: Egypt (+20)
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // ✅ Open WhatsApp chat
      window.open(whatsappUrl, "_blank");

      setSuccessMessage("Registration successful! Redirecting to WhatsApp...");

      // ✅ Reset form
      setinput({
        name: "",
        email: "",
        phonenumber: "",
        location: "",
        quantity: "",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="flex justify-end gap-10 mb-8">
        <Link to="/" className="text-orange-600 font-semibold">
          Home
        </Link>
        <Link to="/service" className="text-orange-600 font-semibold">
          Service
        </Link>
        <Link to="/about" className="text-orange-600 font-semibold">
          About
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🛍️ Product Details */}
        {selectedProduct && (
          <div className="border rounded-lg p-4 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-4">Selected Product</h2>
            <div className="flex flex-col items-center">
              {/* Main Product Image */}
              <div className="w-full mb-4">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '1/1', maxHeight: '400px' }}>
                  <img
                    src={productImages[selectedImageIndex] || getPlaceholderImage()}
                    alt={selectedProduct.name || "Product"}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const placeholder = getPlaceholderImage();
                      if (e.target.src !== placeholder) {
                        e.target.src = placeholder;
                      }
                    }}
                  />
                </div>

                {/* Image Thumbnail Selector */}
                {productImages.length > 1 && (
                  <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                    {productImages.map((imageUrl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedImageIndex
                            ? "border-orange-600 ring-2 ring-orange-300"
                            : "border-gray-300 hover:border-orange-400"
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`${selectedProduct.name} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const placeholder = getPlaceholderImage();
                            if (e.target.src !== placeholder) {
                              e.target.src = placeholder;
                            }
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                {productImages.length > 1 && (
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Image {selectedImageIndex + 1} of {productImages.length}
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-2 text-center">
                {selectedProduct.description}
              </p>
              <div className="flex justify-between w-full mt-2">
                <span className="font-bold text-green-600 text-xl">
                  ${selectedProduct.price}
                </span>
                <span className="text-gray-500">
                  {selectedProduct.category?.name || "Uncategorized"}
                </span>
              </div>
              {selectedProduct.stock_quantity !== undefined && (
                <div className="w-full mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Available:</span> {selectedProduct.stock_quantity} items
                </div>
              )}
            </div>
          </div>
        )}

        {/* 📝 Registration Form */}
        <div className="border rounded-lg p-6 bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your name"
              />
              {error.name && (
                <p className="text-red-500 text-sm mt-1">{error.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your email"
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="number"
                name="phonenumber"
                value={input.phonenumber}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your phone number"
              />
              {error.phonenumber && (
                <p className="text-red-500 text-sm mt-1">
                  {error.phonenumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your location"
              />
              {error.location && (
                <p className="text-red-500 text-sm mt-1">{error.location}</p>
              )}
            </div>

            {/* ✅ Number of Items Field */}
            <div>
              <label className="block text-gray-700 mb-1">
                Number of Items
              </label>
              <input
                type="number"
                name="quantity"
                value={input.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter number of items"
                min="1"
              />
              {error.quantity && (
                <p className="text-red-500 text-sm mt-1">{error.quantity}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition-colors"
            >
              Submit
            </button>

            {successMessage && (
              <p className="text-green-500 text-center mt-2">
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registeration;
