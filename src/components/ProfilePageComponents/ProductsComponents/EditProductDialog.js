import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import scrollToTop from "../../../utils/ScrollToTop";

const EditProductDialog = ({
  modalId,
  setImage,
  setEditProduct,
  product,
  message,
  handleAddImage,
  handleRemoveImage,
  editProduct,
  appendImage,
  image,
  handleChange,
  wearList,
  wearOptions,
  handleWear,
  categoriesList,
  categorieOptions,
  handleCategorie,
  handleSubmit,
  errorMessage,
}) => {
  return (
    <dialog
      id={modalId}
      className="modal hover:cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-box p-0 rounded-md max-w-md w-[98%]">
        <form method="dialog">
          <button
            onClick={() => {
              setImage(null);
              setEditProduct({});
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
          {product.title}
        </h3>
        {message && (
          <p
            className={`${
              message === "Image added" ? "text-green-500" : "text-red-500"
            } text-center`}
          >
            {message}
          </p>
        )}
        <div
          className={`p-2 flex border-b ${
            product?.images.length <= 4 ? "justify-center" : "overflow-auto"
          }`}
        >
          {product?.images.map((image) => {
            return (
              <div key={uuidv4()} className="avatar flex flex-col mx-1">
                <div className="w-28 h-28 shadow-xl rounded-xl border-black border-2">
                  <img src={image} alt="" />
                </div>
                <form
                  className="flex justify-center"
                  onSubmit={(e) =>
                    handleRemoveImage(e, product, image, product?.images)
                  }
                >
                  <button className="hover:underline w-fit">Remove</button>
                </form>
              </div>
            );
          })}
        </div>
        <div className="p-2 flex flex-col border-b mb-4">
          <h1 className="text-center font-semibold text-lg">Add an image</h1>
          <form
            className="flex w-full flex-col justify-center"
            onSubmit={(e) => handleAddImage(e, product, product.images)}
          >
            <input
              type="file"
              className="w-[101px] mx-auto file-input file-input-bordered file-input-xs rounded-sm mb-2"
              onChange={appendImage}
            />
            {image && (
              <button className="py-1 bg-neutral px-2 w-32 mb-2 text-white font-semibold rounded-sm mx-auto">
                Add image
              </button>
            )}
          </form>
        </div>
        <div>
          <h1 className="text-center font-semibold text-lg">
            Product Information
          </h1>
          <form
            className="flex flex-col max-w-[400px] mx-auto"
            onSubmit={(e) => handleSubmit(e, modalId)}
          >
            <label className="text-left font-semibold ml-1 mt-4">Title:</label>
            <input
              className="p-2 focus:outline-none border my-4"
              type="text"
              name="title"
              value={editProduct.title}
              onChange={handleChange}
              placeholder="Title..."
            />
            <label className="text-left font-semibold ml-1">Description:</label>
            <textarea
              className="p-2 focus:outline-none border my-4"
              type="text"
              name="description"
              value={editProduct.description}
              onChange={handleChange}
              placeholder="Description..."
            />
            <label className="text-left font-semibold ml-1">Price:</label>
            <input
              className="p-2 focus:outline-none border my-2"
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
            />
            <label className="text-left font-semibold ml-1">Quantity:</label>
            <input
              className="p-2 focus:outline-none border my-2"
              type="number"
              name="quantity"
              value={editProduct.quantity}
              onChange={handleChange}
            />

            <label className="text-left font-semibold ml-1">Wear & Tear:</label>

            <Select
              options={wearList}
              name="categories"
              value={wearOptions}
              onChange={handleWear}
              isSearchable={true}
              className="my-4"
            />

            <label className="text-left font-semibold ml-1">Categories:</label>

            <Select
              options={categoriesList}
              name="wear"
              value={categorieOptions}
              onChange={handleCategorie}
              isSearchable={true}
              isMulti
              className="my-4"
            />

            <label className="text-left font-semibold ml-1">
              Clothing Brand(s):
            </label>

            <input
              className="p-2 focus:outline-none border"
              type="text"
              name="brand"
              onChange={handleChange}
              value={editProduct.brand}
            />
            <button
              onClick={scrollToTop}
              className="text-neutral p-2 border-2 border-neutral hover:bg-neutral-100 mt-6"
            >
              Edit Product
            </button>
          </form>
          <button
            onClick={() => {
              scrollToTop();
              const modal = document.getElementById(modalId);
              modal.close();
            }}
            className="text-neutral p-2 border-2 border-neutral hover:bg-neutral-100 mt-1 mb-6 flex flex-col max-w-[400px] w-full mx-auto"
          >
            Cancel
          </button>

          {errorMessage && (
            <p className="p-2 m-2 bg-white border-red-500 border w-52 mx-auto text-center text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default EditProductDialog;
