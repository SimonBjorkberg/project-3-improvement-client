import "./ProductCard.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { SearchContext } from "../../context/search.context";

function ProductCard({ product }) {
  const { filter } = useContext(SearchContext);
  const { loggedInUser, isLoggedIn } = useContext(AuthContext);
  const [indexImage, setIndexImage] = useState(0);
  let includesId = false;

  if (isLoggedIn) {
    const idToCheck = loggedInUser._id;

    for (let i = 0; i < product.likes.length; i++) {
      if (product.likes[i] === idToCheck) {
        includesId = true;
        break; // Exit the loop early once a match is found
      }
    }
  } else {
    includesId = false;
  }

  const goToPreviousSlide = () => {
    setIndexImage((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setIndexImage((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {product?.length === 0 && filter !== "" && (
        <h1 className="my-10 font-semibold text-xl">
          There are no products within your selected category
        </h1>
      )}
      {product && (
        <div className="card w-96 bg-base-100 shadow-md mb-4 min-h-[28rem] max-h-[28] mx-2 rounded-md">
          <figure className="max-h-[14rem] min-h-[14rem]">
            <Link to={`/product/single/${product._id}`}>
              {product.images && (
                <div className="carousel">
                  <div className="carousel-item relative w-full">
                    <img
                      src={product.images[indexImage]}
                      className="w-full   rounded lg: max-w-[38rem] min-w-[38rem] max-h-[28rem] min-h-[28rem]"
                      alt={`slide${indexImage}`}
                    />
                  </div>
                </div>
              )}
            </Link>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/3">
              <button onClick={goToPreviousSlide} className="btn btn-circle">
                ❮
              </button>
              <button onClick={goToNextSlide} className="btn btn-circle">
                ❯
              </button>
            </div>
          </figure>
          <div className="card-body p-0">
            <div className="flex flex-col items-start">
              <h3 className="card-title">
                {product.price}€
                <span className="badge badge-secondary">New</span>
              </h3>
              <p>Brand: {product.brand}</p>
              <p>{product.age}</p>
            </div>
            <div className="card-actions justify-center h-[132px]">
              {product.categories.map((category, index) => (
                <div
                  key={index}
                  className={`${
                    category.value === "onesies" && "bg-teal-500"
                  } ${category.value === "t-shirts" && "bg-green-500"} ${
                    category.value === "sleepsuits" && "bg-yellow-500"
                  } ${category.value === "bodysuits" && "bg-cyan-500"} ${
                    category.value === "dresses" && "bg-orange-500"
                  } ${category.value === "pantsNleggings" && "bg-purple-500"} ${
                    category.value === "sweatersNcardigans" && "bg-pink-500"
                  } ${category.value === "bibs" && "bg-rose-500"} ${
                    category.value === "outerwear" && "bg-violet-500"
                  } ${
                    category.value === "rompers" && "bg-yellow-600"
                  } badge badge-outline mx-1 my-auto`}
                >
                  {category.label}
                </div>
              ))}
              <p>
                Sold by:{" "}
                <Link
                  to={`/profile/${product.author._id}`}
                  className="text-blue-500 font-semibold"
                >
                  {product.author.username}
                </Link>
              </p>
              <div className="flex w-full h-full">
                <button className="h-12 btn-neutral mt-auto rounded-none rounded-b-md w-full">
                  <Link to={`/product/single/${product._id}`}>
                    More Information
                  </Link>
                </button>
              </div>
              <div className="absolute top-3 right-3">
                <LikeButton
                  productId={product._id}
                  likedStatus={includesId ? true : false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
