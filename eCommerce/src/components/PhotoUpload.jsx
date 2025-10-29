import React, { useState } from "react";
import { Link } from "react-router-dom";

function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    // In a real application, you would upload the file to a server
    // For this example, we'll store it in sessionStorage as a base64 string

    // Get existing photos or initialize empty array
    const existingPhotos = JSON.parse(
      sessionStorage.getItem("customerPhotos") || "[]"
    );

    // Add new photo with metadata
    const newPhoto = {
      id: Date.now(),
      name: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      data: preview, // This is the base64 data
      uploadDate: new Date().toISOString(),
    };

    // Add to existing photos
    existingPhotos.push(newPhoto);

    // Save back to sessionStorage
    sessionStorage.setItem("customerPhotos", JSON.stringify(existingPhotos));

    // Update state
    setUploadedPhotos(existingPhotos);

    // Show success message
    setSuccessMessage("Photo uploaded successfully!");

    // // Reset form
    setSelectedFile(null);
    setPreview(null);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Load existing photos on component mount
  React.useEffect(() => {
    const existingPhotos = JSON.parse(
      sessionStorage.getItem("customerPhotos") || "[]"
    );
    setUploadedPhotos(existingPhotos);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="flex justify-between mb-8">
        <Link to="/" className="text-orange-600 font-semibold">
          Home
        </Link>
        <Link to="/about" className="text-orange-600 font-semibold">
          About
        </Link>
        <Link to="/service" className="text-orange-600 font-semibold">
          Service
        </Link>
      </nav>

      <div className="border rounded-lg p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Upload Your Photos</h2>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded shadow"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {preview && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <img
              src={preview}
              alt="Preview"
              className="max-w-md h-auto border rounded"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`w-full py-2 rounded font-semibold ${
            selectedFile
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          Upload Photo
        </button>

        {successMessage && (
          <p className="text-green-500 text-center mt-2">{successMessage}</p>
        )}

        {uploadedPhotos.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Your Uploaded Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="border rounded p-2">
                  <img
                    src={photo.data}
                    alt={photo.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {photo.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(photo.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoUpload;
