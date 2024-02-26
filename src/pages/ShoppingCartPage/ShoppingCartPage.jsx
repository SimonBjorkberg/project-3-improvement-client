import { useContext } from "react";
import { ShoppingCartContext } from "../../context/shoppingCart.context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ShoppingCartPage = () => {
  const { cartProducts, removeItemFromCart, total } =
    useContext(ShoppingCartContext);

  return (
    <>
      <div className="text-left lg:pl-10 py-10 bg-neutral-200 min-h-[33rem] flex flex-col items-center">
        {cartProducts.length === 0 ? (
          <h3 className="pt-20 text-lg">your shopping cart is empty!</h3>
        ) : (
          <>
            <>
              <div className="flex justify-between items-center py-2 border-b mt-8  lg:w-[900px] border-neutral hover:bg-neutral-200 ">
                <div className="avatar">
                  <div className="w-16 rounded-xl"></div>
                </div>
                <p className="my-auto ml-5 text-xl font-semibold w-44 truncate hover:cursor-pointer">
                  Product
                </p>
                <p className="my-auto md:flex hidden ml-5 text-xl w-20">
                  Price
                </p>
                <p className="my-auto md:flex hidden ml-5 text-xl w-36">
                  Quantity
                </p>
                <button className="ml-5"></button>
              </div>
              {cartProducts.map((product) => {
                if (!product || !product._id) {
                  return null;
                }
                return (
                  <div
                    key={product._id}
                    className="flex justify-between items-center py-2 border-b lg:w-[900px] border-neutral hover:bg-neutral-300"
                  >
                    <div className="avatar">
                      <div className="w-16 rounded-xl">
                        <img src={product.images[0]} alt={product.title} />
                      </div>
                    </div>
                    <Link to={`/product/single/${product._id}`}>
                      <p className="my-auto text-xl font-semibold w-44 mr-[20px] truncate hover:cursor-pointer">
                        {product.title}
                      </p>
                    </Link>
                    <p className="my-auto md:flex hidden mr-[30px] text-xl w-20">
                      ${product.price}
                    </p>

                  <input type="text" placeholder={product.quantity} className="my-auto md:flex hidden ml-5 text-xl max-w-[50px] min-w-10 bg-neutral-200" disabled />

                    <button
                      className="ml-5"
                      onClick={() => {
                        removeItemFromCart(product._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                );
              })}
            </>
            <div className="bg-neutral-200 flex flex-col items-center mt-8">
              <p className="mb-8">Total {total}€</p>
              <Link to="/payment">
                <button className="bg-red-400 text-white mb-8 py-2 px-4 rounded-sm ml-2 hover:bg-red-500">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCartPage;
