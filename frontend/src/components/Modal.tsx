import { Image, ImagesProps } from "./Images";

export const Modal: React.FC<ImagesProps> = ({ images }) => {
  return (
    <div>
      <dialog
        id="my_modal_2"
        className="modal flex items-center justify-center bg-black bg-opacity-50"
      >
        <form
          method="dialog"
          className="modal-box bg-white rounded-lg p-4 mx-4 w-full max-w-2xl"
        >
          <h3 className="text-2xl font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 gap-4">
            {images &&
              images.map((image: Image, key: any) => (
                <div key={image?.image.imageId}>
                  <img
                    src={image?.image.url}
                    alt={image?.image.imageId}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
