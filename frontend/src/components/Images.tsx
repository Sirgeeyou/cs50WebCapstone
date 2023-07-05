import React from "react";

interface Image {
  url: string | undefined;
  accessibilityText: string;
  imageId: string;
}

interface ImagesProps {
  images: Image[] | undefined;
}

const Images: React.FC<ImagesProps> = ({ images }) => {
  if (!images) {
    return null;
  }

  return (
    <div className="container mx-auto pt-8">
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-96 h-120 mr-1.5">
            <img
              src={images && images[0]?.url}
              alt={images && images[0]?.accessibilityText}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images &&
              images.slice(1, 5).map((image: Image) => (
                <div className="w-48 h-60">
                  <img
                    src={image?.url}
                    alt={image?.accessibilityText}
                    key={image?.imageId}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
