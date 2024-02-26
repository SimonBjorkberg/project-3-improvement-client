import "./ProductCardHomepage.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { useContext, useEffect, useState } from "react";
import productService from "../../services/product.service";
import { AuthContext } from "../../context/auth.context";

function ProductCardHomepage() {
  const [products, setProducts] = useState("");

  const { loggedInUser, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    productService.getAll().then((response) => {
      if (response.data.length > 7) {
        const sevenRecent = response.data.slice(
          Math.max(response.data.length - 7, 1)
        );
        setProducts(sevenRecent.reverse());
      } else {
        setProducts(response.data);
      }
    });
  }, []);

  return (
    <div className="flex flex-row overflow-x justify-center mx-auto">
      {products &&
        products.map((product, index) => {
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

          return (
            <div
              key={index}
              className="card min-w-[263.85px] w-[263.85px] bg-base-100 shadow-xl mx-1 rounded-t-md mb-3"
            >
              <figure className="max-h-[7rem] min-h-[7rem]">
                <Link to={`/product/single/${product._id}`}>
                  <img src={product.images[0]} alt={product.title} />
                </Link>
              </figure>
              <div className="card-body p-0">
                <div className="flex flex-col items-start pt-3 px-3">
                  <h3 className="card-title">
                    {product.price}€
                    <div className="badge badge-secondary">NEW</div>
                  </h3>
                  <p>
                    Brand:{" "}
                    <span className="font-semibold">{product.brand}</span>
                  </p>
                  <p>
                    Wear & Tear:{" "}
                    <span className="font-semibold">{product.wear.label}</span>
                  </p>
                </div>
                <div className="h-[40px] px-2">
                  {product.categories.map((category, index) => (
                    <div
                      key={index}
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
                    >
                      {category.label}
                    </div>
                  ))}
                </div>
                <p className="h-full mx-2 text-left">
                  Seller:{" "}
                  <Link to={`/profile/${product.author._id}`} className="text-blue-500 font-semibold">
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
          );
        })}
    </div>
  );
}

export default ProductCardHomepage;
