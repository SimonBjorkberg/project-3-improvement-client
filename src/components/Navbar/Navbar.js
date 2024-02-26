import { Link } from "react-router-dom";
import LOGO from '../../navbarLogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import ChatDrawer from "../chatComponents/ChatDrawer";
import SearchBar from "./SearchBar";
import productService from "../../services/product.service";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartContext } from "../../context/shoppingCart.context";

const Navbar = () => {
  const { loggedInUser, logOutUser, isLoggedIn, userInfo } =
    useContext(AuthContext);
  const { cartProducts, removeItemFromCart, total } =
    useContext(ShoppingCartContext);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [titleSearch, setTitleSearch] = useState([]);

  useEffect(() => {
    productService.getAll().then((response) => {
      setSearchData(response.data);
    });
  }, []);

  const setFocus = () => {
    setIsFocused(true);
  };
  const deFocus = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleSearch = () => {
      if (searchValue === "") {
        return setTitleSearch([]);
      }
      const filteredTitles = searchData.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      setTitleSearch(filteredTitles);
    };
    handleSearch();
  }, [searchValue, searchData]);

  const handleRemoveItem = (itemId) => {
    // Call the removeItemFromCart function from the context to remove the item
    removeItemFromCart(itemId);
  };

  return (
    <nav className="h-20 bg-neutral flex w-full md:pl-0 fixed z-50">
      <div className="md:w-28 flex md:justify-center w-28 h-20 justify-between items-center">
        <Link to="/">
          <img src={LOGO} className="h-20 w-28" alt="logo" />
        </Link>
      </div>
      <SearchBar
        setFocus={setFocus}
        titleSearch={titleSearch}
        deFocus={deFocus}
        isFocused={isFocused}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {isFocused && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-80 z-40"
          onClick={deFocus}
        ></div>
      )}
      {loggedInUser && (
        <div className="md:w-[350px] h-full flex items-center justify-center ml-auto">
          <div className="md:flex hidden">
            <div className=" ml-auto mr-6  md:flex sm:hidden">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <span className="py-2 px-4 rounded-sm ml-2 hover:opacity-80 mt-3 ">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      size="2xl"
                      style={{ color: "#ffffff" }}
                    />
                  </span>
                </label>
                <div
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-white w-60 right-0 rounded-md min-w-[33rem]"
                >
                  <h4 className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">
                    Shopping Cart
                  </h4>
                  {cartProducts.length === 0 ? (
                    <p>No products yet</p>
                  ) : (
                    <div className="flex flex-row justify-around mt-2">
                      <p className=" w-16">Product</p>
                      <p>Quantity</p>
                      <p>Price</p>
                      <span className=" w-10"></span>
                    </div>
                  )}
                  {cartProducts?.map((product) => {
                    return (
                      <div className="flex flex-row justify-around mt-2 items-center">
                        <div className="flex flex-col items-center w-16">
                          <p className="mt-2 w-12">{product.title}</p>
                          <img
                            className="mt-2 min-w-[50px] max-w-[50px] min-h-[30px] max-h-[30px]"
                            src={product.images[0]}
                            alt={product.title}
                          ></img>
                        </div>
                        <p className="mt-2">{product.quantity}</p>
                        <p className="mt-2">{product.price}€</p>
                        <button onClick={() => handleRemoveItem(product._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    );
                  })}
                  {cartProducts.length === 0 ? (
                    <span></span>
                  ) : (
                    <>
                      <p className="my-2">Total Price {total}€</p>

                      <Link to="/shopping-cart">
                        <button className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                          Proceed To Checkout
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Link to="/sell" className="my-auto">
              <p className="bg-white py-2 px-4 rounded-sm ml-2 hover:opacity-80 ">
                Sell
              </p>
            </Link>
            <Link to="/chat" className="2xl:hidden my-auto">
              <p className="bg-teal-600 text-white py-2 px-4 rounded-sm ml-2 hover:opacity-80">
                Chats
              </p>
            </Link>
            <Link onClick={logOutUser} className="my-auto">
              <p className="bg-red-400 text-white py-2 px-4 rounded-sm ml-2 hover:bg-red-500">
                Logout
              </p>
            </Link>
            <Link
              to={`/profile/${userInfo?._id}`}
              className="ml-4 mr-6 mt-1 my-auto"
            >
              <div className="avatar hover:opacity-50">
                <div className="h-[60px] rounded-xl border border-neutral-400 bg-white">
                  <img src={userInfo?.image} alt="profile-pic" />
                </div>
              </div>
            </Link>
          </div>
          <div className="md:w-10 w-1/5 ml-auto mr-10 md:hidden flex">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  className="w-10 h-10 hover:cursor-pointer"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 w-60 right-0 rounded-md"
              >
                <Link to={`/profile/${userInfo?._id}`}>
                  <p className="text-xl text-white py-2 mb-1 px-4 rounded-md bg-neutral hover:opacity-80">
                    Profile
                  </p>
                </Link>

                <Link to="/sell">
                  <p className="bg-neutral-300 text-neutral py-2 mb-1 px-4 rounded-md text-xl hover:opacity-80">
                    Sell
                  </p>
                </Link>
                <Link to="/chat" className="2xl:hidden">
                  <p className="bg-neutral-300 text-neutral py-2 px-4 rounded-md mb-1 text-xl hover:opacity-80">
                    Contacts
                  </p>
                </Link>
                <span className="bg-neutral-300 text-neutral py-2 mb-1 px-4 rounded-md text-xl hover:opacity-80">
                  <Link to="/shopping-cart">
                    {" "}
                    <FontAwesomeIcon size="xl" icon={faCartShopping} />{" "}
                  </Link>
                </span>
                <Link onClick={logOutUser} className="mt-12">
                  <p className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loggedInUser && (
        <div className="md:w-[350px] h-full flex items-center justify-center ml-auto">
          <div className=" ml-auto mr-6  md:flex sm:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <span className="py-2 px-4 rounded-sm ml-2 hover:opacity-80 mt-1 ">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    size="2xl"
                    style={{ color: "#ffffff" }}
                  />
                </span>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-white w-60 right-0 rounded-md min-w-[33rem]"
              >
                <h4 className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">
                  Shopping Cart
                </h4>
                {cartProducts.length === 0 ? (
                  <p>No products yet</p>
                ) : (
                  <div className="flex flex-row justify-around mt-2">
                    <p className=" w-16">Product</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <span className=" w-10"></span>
                  </div>
                )}
                {cartProducts?.map((product) => {
                  return (
                    <div className="flex flex-row justify-around mt-2 items-center">
                      <div className="flex flex-col items-center w-16">
                        <p className="mt-2 w-12">{product.title}</p>
                        <img
                          className="mt-2 min-w-[50px] max-w-[50px] min-h-[30px] max-h-[30px]"
                          src={product.images[0]}
                          alt={product.title}
                        ></img>
                      </div>
                      <p className="mt-2">{product.quantity}</p>
                      <p className="mt-2">{product.price}€</p>
                      <button onClick={() => handleRemoveItem(product._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  );
                })}
                {cartProducts.length === 0 ? (
                  <span></span>
                ) : (
                  <>
                    <p className="my-2">Total Price {total}€</p>

                    <Link to="/shopping-cart">
                      <button className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                        Proceed To Checkout
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="md:flex hidden">
            <Link
              to="/login"
              className="bg-white py-2 px-4 rounded-sm mr-2 hover:opacity-80"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white py-2 px-4 rounded-sm ml-2 mr-4  hover:opacity-80"
            >
              Signup
            </Link>
          </div>
          <div className="w-10 ml-auto mr-8 md:hidden flex">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  className="w-10 h-10 hover:cursor-pointer"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-white w-60 right-0 rounded-md"
              >
                <Link
                  to="/login"
                  className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300"
                >
                  Signup
                </Link>

                <span className="text-neutral text-xl py-2 px-4 rounded-md bg-neutral-300">
                  <Link to="/shopping-cart">
                    {" "}
                    <FontAwesomeIcon size="xl" icon={faCartShopping} />{" "}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && <ChatDrawer />}
    </nav>
  );
};

export default Navbar;
