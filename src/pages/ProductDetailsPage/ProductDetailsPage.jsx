import "./ProductDetailsPage.css";
import LikeButton from "../../components/LikeButton/LikeButton";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../../services/product.service";
import { AuthContext } from "../../context/auth.context";
import { ShoppingCartContext } from "../../context/shoppingCart.context";
import scrollToTop from "../../utils/ScrollToTop";

function ProductDetailsPage() {
  const { productId } = useParams();
  const { handleAddToCart } = useContext(ShoppingCartContext);
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const { loggedInUser, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const goToPreviousSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    productService
      .getOne(productId)
      .then((response) => setProduct(response.data));
  }, [productId]);

  let includesId = false;

  if (isLoggedIn) {
    const idToCheck = loggedInUser._id;

    for (let i = 0; i < product.likes?.length; i++) {
      if (product.likes[i] === idToCheck) {
        includesId = true;
        break; // Exit the loop early once a match is found
      }
    }
  } else {
    includesId = false;
  }

  return (
    <>
      {message ? (
        <p className={"text-green-600 font-semibold text-xl text-center pt-20"}>
          {message}
        </p>
      ) : (
        ""
      )}
      <div className={`flex sm:flex-col lg:flex-row ${message ? "" : "pt-20"}`}>
        <div className=" lg:w-2/4 m-8 shrink-0 sm: w-fit">
          {product.images && (
            <div className="carousel">
              <div className="carousel-item relative w-full  max-w-[38rem]  max-h-[28rem]">
                <img
                  src={product.images[index]}
                  className=" rounded w-fit "
                  alt={`slide${index}`}
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    onClick={goToPreviousSlide}
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button onClick={goToNextSlide} className="btn btn-circle">
                    ❯
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="my-8  text-black lg:text-left ">
          <div className=" flex gap-24 sm: justify-center lg:justify-start ">
            <h5 className="text-3xl font-semibold">{product.title}</h5>
            <LikeButton productId={productId} likedStatus={includesId} />
          </div>

          <div className="flex flex-row lg:flex">
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 my-8 justify-center">
                {product.categories.map((category, index) => (
                  <p
                    className={`${
                      category.value === "onesies" && "bg-teal-500"
                    } ${category.value === "t-shirts" && "bg-green-500"} ${
                      category.value === "sleepsuits" && "bg-yellow-500"
                    } ${category.value === "bodysuits" && "bg-cyan-500"} ${
                      category.value === "dresses" && "bg-orange-500"
                    } ${
                      category.value === "pantsNleggings" && "bg-purple-500"
                    } ${
                      category.value === "sweatersNcardigans" && "bg-pink-500"
                    } ${category.value === "bibs" && "bg-rose-500"} ${
                      category.value === "outerwear" && "bg-violet-500"
                    } ${
                      category.value === "rompers" && "bg-yellow-600"
                    } badge badge-outline mx-1 my-auto`}
                    key={index}
                  >
                    {category.label}
                  </p>
                ))}
              </div>
            )}
          </div>

          <p className="mb-6 font-semibold">€ {product.price}</p>
          {product.brand && (
            <p>
              <span className=" font-bold">Brand </span> {product.brand}
            </p>
          )}
          <p>
            <span className=" font-bold">Wear </span>
            {product.wear?.value}
          </p>
          <div className="mb-8">
            <p className=" mt-4">{product.description}</p>
            <p className="mt-4 font-semibold">Quantity</p>
            <input
              type="text"
              placeholder={`Available ${product.quantity}`}
              class="input input-bordered w-full max-w-xs"
              disabled
            />
            <input
              id="quantity"
              type="number"
              className="input input-bordered w-full max-w-xs mb-4 mt-2"
              min={1}
              defaultValue={1}
              max={product.quantity}
            />
            <p>
              <span className=" font-bold">Seller </span>
              {product.author && (
                <Link
                  to={`/profile/${product.author._id}`}
                  className="text-blue-500 font-semibold"
                >
                  {product.author.username}
                </Link>
              )}
            </p>
          </div>
          <div className="text-center">
            <button
              className="btn btn-outline bg-gray-800 text-white w-4/5"
              onClick={() => {
                handleAddToCart(
                  product,
                  parseInt(document.getElementById("quantity").value, 10)
                );
                setTimeout(() => {
                  scrollToTop();
                }, 1000);
                setTimeout(() => {
                  setMessage(
                    `${parseInt(
                      document.getElementById("quantity").value,
                      10
                    )} ${product.title} added`
                  );
                }, 2000);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
