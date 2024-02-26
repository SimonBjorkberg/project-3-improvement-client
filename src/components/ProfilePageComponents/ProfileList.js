const ProfileList = ({ setShowInfo, foundUser, showInfo, loggedInUser }) => {
  return (
    <div className="w-full bg-neutral-300">
      <ul className="flex md:flex-row flex-col md:justify-between lg:w-[900px] md:w-[95%] mx-auto py-10">
        <li
          onClick={() => setShowInfo("products")}
          className={`${
            showInfo === "products" ? "border-b" : ""
          } border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600 w-fit mx-auto mb-5 md:mb-0`}
        >
          Listed Products
        </li>
        <li
          onClick={() => setShowInfo("reviews")}
          className={`${
            showInfo === "reviews" ? "border-b" : ""
          } border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600 w-fit mx-auto mb-5 md:mb-0`}
        >
          Reviews of {foundUser.username}
        </li>
        <li
          onClick={() => setShowInfo("liked")}
          className={`${
            showInfo === "liked" ? "border-b" : ""
          } border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600 w-fit mx-auto mb-5 md:mb-0`}
        >
          Liked products
        </li>
        {loggedInUser?._id === foundUser._id && foundUser.orders?.length > 0 && (
          <li
            onClick={() => setShowInfo("orders")}
            className={`${
              showInfo === "orders" ? "border-b" : ""
            } border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600 w-fit mx-auto md:mb-0`}
          >
            Orders
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileList;
