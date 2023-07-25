import React from "react";
import { Modal } from "./Modal";

export interface Image {
  image: {
    url: string | undefined;
    accessibilityText: string;
    imageId: string;
  };
}

export interface ImagesProps {
  images: Image[] | undefined;
}

const Images: React.FC<ImagesProps> = ({ images }) => {
  if (!images) {
    return null;
  }

  return (
    <div className="container">
      <div className="container mx-auto pt-8">
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center">
            {/* Wrap the first image inside another div with overflow-hidden */}
            <div className="w-full md:w-96 h-120 mr-1.5 rounded-tl-lg rounded-bl-lg overflow-hidden">
              <div className="overflow-hidden rounded-tl-lg h-full ">
                <img
                  onClick={() => (window as any).my_modal_2.showModal()}
                  src={images && images[0]?.image.url}
                  alt={images && images[0]?.image.accessibilityText}
                  className="w-full h-full object-cover cursor-pointer  hover:scale-110 transition duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 cursor-pointer">
              {images &&
                images.slice(1, 5).map((image: Image, key: any) => (
                  <div key={image?.image.imageId} className="w-72 h-72">
                    {/* Apply rounded-br-lg class directly to the last image */}
                    <img
                      src={image?.image.url}
                      alt={image?.image.accessibilityText}
                      className={`w-full h-full object-cover ${
                        key === 3
                          ? "rounded-br-lg"
                          : key === 1
                          ? "rounded-tr-lg"
                          : ""
                      } cursor-pointer hover:scale-110 transition duration-300 ease-in-out delay-150`}
                      onClick={() => (window as any).my_modal_2.showModal()}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
