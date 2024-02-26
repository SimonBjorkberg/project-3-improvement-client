import scrollToTop from "../../../utils/ScrollToTop";
import { useNavigate } from "react-router-dom";
import productService from "../../../services/product.service";
import { useState, useEffect } from "react";
import categoriesList from "../../../data/categories";
import wearList from "../../../data/wear";
import DeleteAndEditButtons from "./DeleteAndEditButtons";
import EditProductDialog from "./EditProductDialog";

const Products = ({
  foundUser,
  loggedInUser,
  showMore,
  setShowMore,
  setSuccessMessage,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [categorieOptions, setCategorieOptions] = useState([]);
  const [wearOptions, setWearOptions] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [recentProducts, setRecentProducts] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e, modalId) => {
    const modal = document.getElementById(modalId);
    modal.close();
    e.preventDefault();
    if (editProduct.title === "") {
      return setErrorMessage("Please enter a title");
    } else if (editProduct.description === "") {
      return setErrorMessage("Please enter a description");
    } else if (editProduct.images?.length === 0) {
      return setErrorMessage("Please insert at least one image");
    } else if (editProduct.price === 0) {
      return setErrorMessage("Please enter a price above €0");
    } else if (editProduct.quantity === 0) {
      return setErrorMessage("Please set a quantity above 0");
    } else if (categorieOptions.length === 0) {
      return setErrorMessage("Please select at least one category");
    } else if (categorieOptions.length >= 3) {
      return setErrorMessage("You can only select 2 categories");
    } else {
      const editedProduct = {
        ...editProduct,
        title: editProduct.title,
        description: editProduct.description,
        images: editProduct?.images,
        price: editProduct.price,
        quantity: editProduct.quantity,
        categories: categorieOptions,
        wear: wearOptions,
      };

      productService
        .editOne(editProduct._id, editedProduct)
        .then((response) => {
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((prevProduct) => {
              if (prevProduct._id === editProduct._id) {
                return response.data.updatedProduct;
              }
              return prevProduct;
            });
            return updatedProducts;
          });
        });
      setEditProduct({});
      setCategorieOptions([]);
      setWearOptions({});
      scrollToTop();
      setSuccessMessage("Product updated successfully")
    }
  };

  function handleCategorie(data) {
    setCategorieOptions(data);
  }
  function handleWear(data) {
    setWearOptions(data);
  }

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  }, [message]);

  useEffect(() => {
    if (foundUser?.products.length > 5 && !showMore) {
      const productsCopy = [...products]
      const fiveRecent = productsCopy.slice(
        Math.max(productsCopy.length - 5, 1)
      );
      setRecentProducts(fiveRecent.reverse());
    } else {
      setRecentProducts(foundUser?.products.reverse());
    }
  }, [foundUser, showMore, products]);

  useEffect(() => {
    setProducts(recentProducts);
  }, [recentProducts]);

  const handleRemoveImage = (e, product, deletedImage, images) => {
    e.preventDefault();
    if (images.length <= 1) {
      return setMessage("There must be at least one image");
    }

    const filteredImages = product.images.filter((image) => {
      return image !== deletedImage;
    });

    const newProduct = { ...product, images: filteredImages };

    productService.editOne(product._id, newProduct).then((response) => {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((prevProduct) => {
          if (prevProduct._id === product._id) {
            return response.data.updatedProduct;
          }
          return prevProduct;
        });
        setMessage("Removed image");
        return updatedProducts;
      });
    });
  };

  const appendImage = (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    setImage(formData);
  };

  const handleAddImage = async (e, product, images) => {
    e.preventDefault();

    const imageResponse = await productService.uploadImage(image);
    const updatedImages = [...images, imageResponse.data.fileUrl];
    const newProduct = { ...product, images: updatedImages };

    const updatedProduct = await productService.editOne(
      product._id,
      newProduct
    );

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((prevProduct) => {
        if (prevProduct._id === product._id) {
          return updatedProduct.data.updatedProduct;
        }
        return prevProduct;
      });
      return updatedProducts;
    });
    setImage(null);
    setMessage("Image added");
  };

  const handleDeleteProduct = (productId) => {
    const productsCopy = [...products];
    const filteredProducts = productsCopy.filter((product) => {
      return product._id !== productId;
    });
    productService.deleteOne(productId);
    setProducts(filteredProducts);
    setSuccessMessage("Product has been removed")
  };

  return (
    <div className="text-left py-10 bg-neutral-200">
      {!foundUser?.products?.length ? (
        <p className="text-center">{foundUser.username} has not listed any products</p>
      ) : (
        <div>
          {<div className="flex lg:w-[900px] mx-auto">
            <div className="flex flex-row ml-auto">
              <div className="flex flex-row w-40 justify-between">
                <p
                  className={`${
                    loggedInUser?._id === foundUser._id
                      ? "my-auto md:flex hidden text-sm text-left"
                      : "my-auto flex text-sm text-left"
                  }`}
                >
                  Price
                </p>
                <p
                  className={`${
                    loggedInUser?._id === foundUser._id
                      ? "my-auto md:flex hidden text-sm text-left"
                      : "my-auto flex text-sm text-left"
                  }`}
                >
                  Available
                </p>
                <p
                  className={`${
                    loggedInUser?._id === foundUser._id
                      ? "my-auto md:flex hidden text-sm text-left"
                      : "my-auto flex text-sm text-left"
                  }`}
                >
                  Likes
                </p>
              </div>
              <div
                className={`${
                  loggedInUser?._id === foundUser._id ? "w-[85px]" : " w-[24px]"
                }`}
              ></div>
            </div>
          </div>}
          {products?.map((product) => {
            const modalId = `modal-${product._id}`;
            const deleteModalId = `modalDelete-${product._id}`;
            return (
              <div
                key={product._id}
                className="flex py-2 border-b lg:w-[900px] border-neutral hover:bg-neutral-300 hover:cursor-pointer mx-auto"
                onClick={() => navigate(`/product/single/${product._id}`)}
              >
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row">
                    <div className="avatar">
                      <div className="w-16 rounded-xl">
                        <img src={product.images[0]} alt="" />
                      </div>
                    </div>
                    <p className="my-auto ml-5 text-sm font-semibold max-w-[80px] md:max-w-[200px] truncate">
                      {product.title}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p
                      className={`${
                        loggedInUser?._id === foundUser._id
                          ? "my-auto md:flex hidden ml-5 text-sm w-12 text-left"
                          : "my-auto flex mr-3 text-sm w-12 text-left"
                      }`}
                    >
                      € {product.price}
                    </p>
                    <p
                      className={`${
                        loggedInUser?._id === foundUser._id
                          ? "my-auto md:flex hidden ml-5 text-sm w-12 text-left"
                          : "my-auto flex ml-5 text-sm w-12 text-left"
                      }`}
                    >
                      {product.quantity}
                    </p>
                    <p
                      className={`${
                        loggedInUser?._id === foundUser._id
                          ? "my-auto md:flex hidden ml-5 text-sm w-12 text-left"
                          : "my-auto flex ml-5 text-sm w-11 text-left"
                      }`}
                    >
                      {product.likes.length}
                    </p>
                    <DeleteAndEditButtons
                      loggedInUser={loggedInUser}
                      foundUser={foundUser}
                      modalId={modalId}
                      setEditProduct={setEditProduct}
                      setCategorieOptions={setCategorieOptions}
                      setWearOptions={setWearOptions}
                      product={product}
                      deleteModalId={deleteModalId}
                      handleDeleteProduct={handleDeleteProduct}
                    />
                  </div>
                </div>
                <EditProductDialog
                  modalId={modalId}
                  setEditProduct={setEditProduct}
                  product={product}
                  message={message}
                  handleAddImage={handleAddImage}
                  handleRemoveImage={handleRemoveImage}
                  editProduct={editProduct}
                  appendImage={appendImage}
                  image={image}
                  setImage={setImage}
                  handleChange={handleChange}
                  wearList={wearList}
                  wearOptions={wearOptions}
                  handleWear={handleWear}
                  categoriesList={categoriesList}
                  categorieOptions={categorieOptions}
                  handleCategorie={handleCategorie}
                  handleSubmit={handleSubmit}
                  errorMessage={errorMessage}
                />
              </div>
            );
          })}
        </div>
      )}
      {!showMore && foundUser?.products.length > 5 && (
        <div className="mt-5 lg:w-[900px] flex justify-center mx-auto">
          <button onClick={() => setShowMore(true)} className="w-fit">
            Show More
          </button>
        </div>
      )}
      {showMore && (
        <div className="mt-5 lg:w-[900px] flex justify-center mx-auto">
          <button
            onClick={() => {
              setShowMore(false);
              scrollToTop();
            }}
            className="w-fit"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
