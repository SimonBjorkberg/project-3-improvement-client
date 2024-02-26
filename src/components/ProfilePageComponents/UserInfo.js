import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const UserInfo = ({
  foundUser,
  setFoundUser,
  loggedInUser,
  newContact,
  createChat,
  setNewContact,
  successMessage,
  setSuccessMessage,
  userReviews,
}) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage]);

  const handleAverageRating = () => {
    const reviewsLength = userReviews.length;
    let reviewNum = 0;
    userReviews.forEach((review) => {
      if (!review.review) {
        return;
      }
      reviewNum += review.review;
    });
    const result = Math.floor(reviewNum / reviewsLength);
    return setAverageRating(result);
  };

  useEffect(() => {
    handleAverageRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundUser, userReviews]);

  return (
    <div className="md:h-60 h-48 flex bg-neutral-200">
      <div className="avatar">
        <div className="md:w-40 md:h-40 w-32 h-32 shadow-xl mt-auto my-auto md:mb-10 ml-6 md:ml-10 rounded-full border-black border-2">
          <img src={foundUser?.image} alt="" />
        </div>
      </div>
      <div className="md:ml-10 ml-4 flex flex-col my-auto">
        <p className="md:text-5xl text-3xl md:mb-2 font-bold text-left">
          {foundUser?.username}
        </p>
        <p className="font-semibold text-sm text-left">
          {foundUser.products?.length} Listed Products * {userReviews.length}{" "}
          Reviews <br />
          <Rating
            initialRating={averageRating}
            readonly
            emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" />}
            fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" />}
          />
        </p>
      </div>
      {loggedInUser && loggedInUser?._id === foundUser?._id && (
        <>
          <EditProfile
            setSuccessMessage={setSuccessMessage}
            setFoundUser={setFoundUser}
            foundUser={foundUser}
          />
        </>
      )}
      {successMessage ? (
        <div className="absolute w-full mt-0 md:mt-2 z-30">
          <div className="flex flex-row md:w-fit w-full p-2 rounded-none md:rounded-xl mx-auto bg-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current mr-3 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      ) : null}
      {newContact && (
        <p
          className="hover:cursor-pointer hover:bg-teal-500 absolute right-0 top-[80px] w-fit bg-teal-600 text-neutral shadow-md rounded-bl-xl py-3 md:py-1 px-3"
          onClick={() => {
            createChat(loggedInUser._id, foundUser._id);
            setNewContact(false);
          }}
        >
          add {foundUser.username} as a contact
        </p>
      )}
    </div>
  );
};

export default UserInfo;
