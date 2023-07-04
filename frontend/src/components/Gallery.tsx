import React from "react";

// Define an interface for the image object
interface Image {
  image: {
    url: string | undefined;
  };
  accessibilityText: string;
  imageId: string;
}

// Define a component that takes the images array as a prop and renders each image using the img tag
const Gallery = ({ images }: { images: Image[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <img
          src={image.image.url}
          alt={image.accessibilityText}
          key={image.imageId}
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
};

export default Gallery;
