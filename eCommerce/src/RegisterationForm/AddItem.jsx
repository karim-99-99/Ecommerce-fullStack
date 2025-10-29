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
    <div>
      <nav className="grid grid-cols-3 w-80 ml-auto text-orange-600 text-xl font-semibold">
        <Link to="/">Home</Link>
        <Link to="/service">Service</Link>
        <Link to="/about">About</Link>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/5 mt-10 gap-4 mx-auto"
      >
        <label className="font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          placeholder="Product name"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        {error?.name && <p className="text-red-500">{error.name}</p>}

        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          value={input.description}
          onChange={handleChange}
          placeholder="Description"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        {error?.description && <p className="text-red-500">{error.description}</p>}

        <label className="font-semibold">Category</label>
        <select
          name="category"
          value={input.category}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md p-2"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {error?.category && <p className="text-red-500">{error.category}</p>}

        <label className="font-semibold">Upload your Photo</label>
        <UploadPhoto
          onPhotoSelect={(file) =>
            setInput((prev) => ({ ...prev, Photo: file }))
          }
        />
        {error?.Photo && <p className="text-red-500">{error.Photo}</p>}

        <button
          type="submit"
          className="border-2 border-orange-500 bg-orange-500 rounded-md p-2 font-semibold text-white hover:bg-orange-600"
        >
          Submit
        </button>

        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </form>
    </div>
  );
}

export default AddItem;
