import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, fetchByCategory } from "../services/api"; // API functions
import { getProductImageUrl, getPlaceholderImage } from "../utils/imageUtils";

// Component for product image carousel on hover
function ProductImageCarousel({ product, onError }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Get all images for the product (currently just one, but can be extended)
  const getProductImages = () => {
    const images = [];
    if (product.image) {
      images.push(getProductImageUrl(product.image));
    }
    // If product has multiple images in the future, add them here
    // if (product.images && Array.isArray(product.images)) {
    //   images.push(...product.images.map(img => getProductImageUrl(img)));
    // }
    if (images.length === 0) {
      images.push(getPlaceholderImage());
    }
    return images;
  };

  const images = getProductImages();

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (images.length > 1) {
      setCurrentImageIndex(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div
      className="relative h-64 bg-gray-100 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`${product.name} - Image ${index + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
            index === currentImageIndex
              ? "opacity-100 z-10 scale-110"
              : "opacity-0 z-0 scale-100"
          }`}
          onError={onError}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 z-20">
        {product.category?.name || "Uncategorized"}
      </div>
    </div>
  );
}

function Service() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 🟧 Available categories — use slug if Django filters by slug
  const categories = [
    { name: "All", slug: "all" },
    { name: "Men's Clothing", slug: "mens-clothes" },
    { name: "Women's Clothing", slug: "womens-clothes" },
    { name: "Electronics", slug: "electronics" },
    { name: "Jewelery", slug: "jewelery" },
  ];

  // Load products on category change
  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  // 🧠 Fetch products from API
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response =
        selectedCategory === "all"
          ? await fetchProducts()
          : await fetchByCategory(selectedCategory); // fetch by slug if Django expects slug

      const productsData = response.data || [];
      // Debug: Log image URLs to help troubleshoot
      console.log("Products loaded:", productsData.length);
      productsData.forEach((product, index) => {
        console.log(`Product ${index + 1} (${product.name}):`, {
          image: product.image,
          hasImage: !!product.image,
        });
      });
      setProducts(productsData);
    } catch (error) {
      setError(error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // 🧭 Filter products by search term (matches product name or category name)
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = product.category?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  // 🧭 Filter visible categories in dropdown by search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When a product is clicked
  const handleItemClick = (product) => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/service/registration");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Enhanced Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                ShopHouse
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  Home
                </Link>
                <Link to="/service" className="text-orange-600 font-medium">
                  Products
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                  About
                </Link>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium text-gray-700 bg-white"
              >
                {filteredCategories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
          Our <span className="text-orange-600">Products</span>
        </h1>
        <p className="text-gray-600 mb-6">Discover amazing products at great prices</p>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <span className="ml-4 text-gray-600">Loading products...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 font-medium">No products found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 group"
              onClick={() => handleItemClick(product)}
            >
              {/* Product Image with Carousel */}
              <ProductImageCarousel
                product={product}
                onError={(e) => {
                  console.error(`Failed to load image for ${product.name}:`, e.target.src);
                  const placeholder = getPlaceholderImage();
                  if (e.target.src !== placeholder) {
                    e.target.src = placeholder;
                  }
                }}
              />
              
              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-orange-600">
                    ${product.price}
                  </span>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
