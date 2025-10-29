import React, { useState } from "react";

function UploadPhoto({ onPhotoSelect }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setSelectedPhoto(file);
    setError("");
    setSuccessMessage("");

    // show preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleUpload = () => {
    if (!selectedPhoto) {
      setError("Please select a photo first");
      return;
    }

    if (onPhotoSelect) onPhotoSelect(selectedPhoto);

    setSuccessMessage("Photo selected successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div>
      <div className="flex flex-col">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border shadow-md border-black rounded-md p-2"
        />
        {error && <p className="text-red-500">{error}</p>}

        {preview && (
          <div className="mt-4">
            <h3 className="font-semibold">Preview</h3>
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded-md border"
            />
          </div>
        )}

        <button
          type="button" // ✅ this prevents form submission
          onClick={handleUpload}
          disabled={!selectedPhoto}
          className={`w-full py-2 rounded font-semibold mt-5 ${
            selectedPhoto
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          Upload Photo
        </button>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}

export default UploadPhoto;
