import { useState } from "react";
import reviewService from "../../../services/review.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Rating from "react-rating";

const ReviewForm = ({
  foundUser,
  setUserReviews,
  userReviews,
  loggedInUser,
  hasReviewed,
}) => {
  const [starAmount, setStarAmount] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewInfo = { review: starAmount, comment: comment };
    const response = await reviewService.createReview(
      foundUser?._id,
      reviewInfo
    );
    setUserReviews([...userReviews, response.data.newReview]);
    setComment("")
    setStarAmount(0)
  };

  return (
    <>
      {loggedInUser && !hasReviewed && loggedInUser?._id !== foundUser?._id && (
        <div className="flex flex-col py-2 border-b lg:w-[900px] mx-auto">
          <Rating
            emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" />}
            fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" />}
            onChange={(rate) => setStarAmount(rate)}
            initialRating={starAmount}
          />
          <form onSubmit={handleReviewSubmit}>
            <textarea
              className="w-full p-2 outline-none mt-2 bg-neutral-100 rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              name="comment"
            />
            <button className="hover:opacity-50">Post Review</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ReviewForm;
