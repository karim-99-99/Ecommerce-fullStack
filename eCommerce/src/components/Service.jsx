import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, fetchByCategory } from "../services/api"; // API functions

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

      setProducts(response.data || []);
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
    <div>
      {/* 🧭 Navbar */}
      <nav className="flex justify-end gap-5 text-orange-600 font-semibold p-4">
        <Link to="/" className="text-lg hover:underline">
          Home
        </Link>
        <Link to="/service" className="text-lg hover:underline">
          Service
        </Link>
        <Link to="/about" className="text-lg hover:underline">
          About
        </Link>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hidden sm:block rounded-3xl w-28 p-1 focus:outline-none border border-orange-700 text-sm text-orange-600"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="focus:outline-none rounded-full w-24 sm:w-auto border border-orange-700 text-orange-600"
        >
          {filteredCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </nav>

      {/* 🏪 Page Title */}
      <div>
        <h1 className="text-5xl font-bold m-10 font-sans text-orange-600">
          Store Products
        </h1>
        {loading && <p className="text-gray-500">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredProducts.length === 0 && !loading && (
          <p className="text-center text-gray-500 col-span-full">
            No items found.
          </p>
        )}

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleItemClick(product)}
          >
            <div className="flex flex-col items-center">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="h-80 w-auto mb-4 object-cover"
              />
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span className="font-bold text-orange-600">
                  ${product.price}
                </span>
                <span className="text-gray-500">
                  {product.category?.name || "Uncategorized"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
