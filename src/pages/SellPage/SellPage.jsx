import "./SellPage.css";
import { useEffect, useState } from "react";
import productService from "../../services/product.service";
import Select from "react-select";
import scrollToTop from "../../utils/ScrollToTop";

function SellPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [categorieOptions, setCategorieOptions] = useState([]);
  const [wearOptions, setWearOptions] = useState();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    images: [],
    price: 0,
    quantity: 0,
    categories: [],
    wear: "New",
    brand: "",
  });

  const appendImage = async (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    const response = await productService.uploadImage(formData);
    const updatedImages = [...images, response.data.fileUrl];
    setImages(updatedImages);
    product.images.push(response.data.fileUrl);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.title === "") {
      return setErrorMessage("Please enter a title");
    } else if (product.description === "") {
      return setErrorMessage("Please enter a description");
    } else if (product.images.length === 0) {
      return setErrorMessage("Please insert at least one image");
    } else if (product.price === 0) {
      return setErrorMessage("Please enter a price above $0");
    } else if (product.quantity === 0) {
      return setErrorMessage("Please set a quantity above 0");
    } else if (categorieOptions.length === 0) {
      return setErrorMessage("Please select at least one category");
    } else if (categorieOptions.length >= 3) {
      return setErrorMessage("You can only select 2 categories");
    } else {
      const createThisProduct = {
        title: product.title,
        description: product.description,
        images: product.images,
        price: product.price,
        quantity: product.quantity,
        categories: categorieOptions,
        wear: wearOptions,
        brand: product.brand,
      };
      productService.create(createThisProduct);
      setErrorMessage("");
      setMessage("Product Created!");
      setProduct({
        title: "",
        description: "",
        images: [],
        price: 0,
        quantity: 0,
        categories: categorieOptions,
        wear: wearOptions,
        brand: "",
      });
      setCategorieOptions([]);
      setWearOptions({});
      scrollToTop();
    }
  };

  function handleCategorie(data) {
    setCategorieOptions(data);
  }

  function handleWear(data) {
    setWearOptions(data);
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }, [message]);

  const categoriesList = [
    { value: "rompers", label: "Rompers" },
    { value: "sleepsuits", label: "Sleepsuits" },
    { value: "onesies", label: "Onesies" },
    { value: "bodysuits", label: "Bodysuits" },
    { value: "dresses", label: "Dresses" },
    { value: "t-shirts", label: "T-shirts" },
    { value: "pantsNleggings", label: "Pants" },
    { value: "sweatersNcardigans", label: "Sweaters" },
    { value: "bibs", label: "Bibs" },
    { value: "outerwear", label: "Outerwear" },
  ];

  const wearList = [
    { value: "brand new", label: "Brand New" },
    { value: "well worn", label: "Well Worn" },
    { value: "stains", label: "Stains" },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <h1 className="my-4 text-2xl">Sell an Item</h1>
      {message && (
        <p className="p-2 text-green-600 font-semibold text-xl">{message}</p>
      )}
      <input
        type="file"
        className="file-input file-input-bordered file-input-xs w-full max-w-xs"
        onChange={(e) => appendImage(e)}
      />
      {product.images.length !== 0 && (
        <p className="font-semibold">Selected Pictures</p>
      )}
      {product.images.length > 0 && (
        <div className="flex flex-row justify-center w-fit mx-auto border-2 p-3 border-neutral rounded-md">
          {product.images?.map((image, index) => (
            <img key={index} src={image} className="w-20 mx-1" alt="" />
          ))}
        </div>
      )}
      <form className="flex flex-col max-w-[400px] mx-auto" onSubmit={handleSubmit}>
        <label className="text-left font-semibold ml-1 mt-4">Title:</label>
        <input
          className="p-2 focus:outline-none border  my-4"
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title..."
        />
        <label className="text-left font-semibold ml-1">Description:</label>
        <textarea
          className="p-2 focus:outline-none border my-4"
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description..."
        />
        <label className="text-left font-semibold ml-1">Price:</label>
        <input
          className="p-2 focus:outline-none border my-2"
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <label className="text-left font-semibold ml-1">Quantity:</label>
        <input
          className="p-2 focus:outline-none border my-2"
          type="number"
          name="quantity"
          value={product.quantity}
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
          value={product.brand}
          onChange={handleChange}
        />
        <button className="text-neutral p-2 border-2 border-neutral hover:bg-neutral-100 my-6">
          Create Product
        </button>
      </form>
      {errorMessage && (
        <p className="p-2 m-2 bg-white border-red-500 border w-52 mx-auto text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default SellPage;
