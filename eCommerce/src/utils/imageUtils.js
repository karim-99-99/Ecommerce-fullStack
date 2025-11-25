// Utility function for handling product images
export const getProductImageUrl = (imageUrl) => {
  // If no image URL provided, return placeholder
  if (!imageUrl || imageUrl === null || imageUrl === '') {
    return getPlaceholderImage();
  }
  
  // If it's already a valid URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path, construct full URL
  if (imageUrl.startsWith('/')) {
    // Remove /api/ from base URL if present, as media files are served from root
    let baseUrl = import.meta.env.VITE_API_URL || "https://ecommerce-fullstack-django.up.railway.app";
    if (baseUrl.endsWith('/api/')) {
      baseUrl = baseUrl.replace('/api/', '');
    } else if (baseUrl.endsWith('/api')) {
      baseUrl = baseUrl.replace('/api', '');
    }
    return `${baseUrl}${imageUrl}`;
  }
  
  return imageUrl;
};

// Placeholder image using a data URI (1x1 transparent pixel with gray background)
export const getPlaceholderImage = () => {
  // Using a simple SVG data URI as placeholder
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
};

// Check if image URL is valid
export const isValidImageUrl = (url) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:');
};

