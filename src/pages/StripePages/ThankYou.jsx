import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ShoppingCartContext } from "../../context/shoppingCart.context";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const { userInfo } = useContext(AuthContext);
  const { total, cartProducts, updateCart } = useContext(ShoppingCartContext);
  const [productsBought, setProductsBought] = useState(cartProducts);
  const [cartTotal, setCartTotal] = useState(total);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      clearCart();
    }, 3000);
  }, []);

  const clearCart = () => {
    updateCart([]);
  };

  return (
    <>
      <h2 className="pt-20">Your order is on its way {userInfo?.username}</h2>

      <div>
        <div className="flex lg:w-[900px] mx-auto">
          <div className="flex flex-row ml-auto">
            <div className="flex flex-row justify-between">
              <p
                className={"my-auto ml-5 md:flex hidden text-sm w-12 text-left"}
              >
                Price
              </p>
            </div>
            <div className={"w-[85px]"}>
              <p
                className={"my-auto ml-5 md:flex hidden text-sm w-12 text-left"}
              >
                Quantity
              </p>
            </div>
          </div>
        </div>
        {productsBought?.map((productBought) => {
          return (
            <div
              key={productBought._id}
              className="flex py-2 border-b lg:w-[900px] border-neutral hover:bg-neutral-300 hover:cursor-pointer mx-auto"
              onClick={() => navigate(`/product/single/${productBought._id}`)}
            >
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row">
                  <div className="avatar">
                    <div className="w-16 rounded-xl">
                      <img src={productBought.images[0]} alt="" />
                    </div>
                  </div>
                  <p className="my-auto ml-5 text-sm font-semibold max-w-[80px] md:max-w-[200px] truncate">
                    {productBought.title}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p
                    className={
                      "my-auto md:flex hidden ml-5 text-sm w-12 text-left"
                    }
                  >
                    € {productBought.price}
                  </p>
                  <p
                    className={
                      "my-auto md:flex hidden ml-5 text-sm w-12 text-left"
                    }
                  >
                    {productBought.quantity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="mt-8 mb-8">
        Total amount of your order: <b>{cartTotal}$</b>
      </h3>
    </>
  );
}

export default ThankYou;
