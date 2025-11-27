import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, fetchByCategory } from "../services/api"; // API functions
import { getProductImageUrl, getPlaceholderImage } from "../utils/imageUtils";

// Component for product image gallery on hover - shows all images at once
function ProductImageGallery({ product, onError }) {
  const [isHovered, setIsHovered] = useState(false);

  // Get all images for the product
  const getProductImages = () => {
    const images = [];
    
    // Add main image first if it exists
    if (product.image) {
      images.push(getProductImageUrl(product.image));
    }
    
    // Add additional images from the images array
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach(img => {
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

  const images = getProductImages();
  const imageCount = images.length;

  // Determine grid layout based on number of images
  const getGridClass = () => {
    if (imageCount === 1) return "grid-cols-1";
    if (imageCount === 2) return "grid-cols-2";
    if (imageCount === 3) return "grid-cols-2";
    if (imageCount === 4) return "grid-cols-2";
    return "grid-cols-2"; // Default for 5+ images
  };

  return (
    <div
      className="relative h-64 bg-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default view - shows first image */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered && imageCount > 1 ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={onError}
        />
      </div>

      {/* Hover view - shows all images in grid */}
      {imageCount > 1 && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className={`grid ${getGridClass()} gap-1 h-full p-1`}>
            {images.map((imageUrl, index) => (
              <div key={index} className="relative overflow-hidden rounded">
                <img
                  src={imageUrl}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={onError}
                />
                {imageCount > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                    +{imageCount - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image count badge */}
      {imageCount > 1 && (
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 z-20">
          {imageCount} photos
        </div>
      )}

      {/* Category badge */}
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
              {/* Product Image with Gallery (shows all photos on hover) */}
              <ProductImageGallery
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
