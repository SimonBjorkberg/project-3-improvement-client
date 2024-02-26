import { useState } from "react";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import reviewService from "../../../services/review.service";

const EditReviewDialog = ({ review, modalId, setUserReviews, setSuccessMessage, foundUser }) => {
  const [comment, setComment] = useState(review.comment);
  const [stars, setStars] = useState(review.review);

  const modal = document.getElementById(modalId)

  const handleReviewEdit = async (e) => {
    e.preventDefault();
    const requestBody = { review: stars, comment };
    const response = await reviewService.editReview(review._id, requestBody);
    setUserReviews((prev) => {
      const updatedReviews = prev.map((prevReview) => {
        if (prevReview._id === review._id) {
          return response.data.updatedReview;
        }
        return prevReview;
      });
      return updatedReviews;
    });
    const modal = document.getElementById(modalId)
    modal.close()
    setSuccessMessage("Review updated successfully")
  };

  return (
    <>
      <dialog
        id={modalId}
        className="modal hover:cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-box rounded-md max-w-md p-0">
        <button
        onClick={() => modal.close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
          >
            ✕
          </button>
          <h1 className="w-full bg-neutral text-white p-2">Edit your review of {foundUser.username}</h1>
          <Rating
            className="p-2"
            initialRating={stars}
            onChange={(rate) => setStars(rate)}
            emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" />}
            fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" />}
          />
          <form onSubmit={handleReviewEdit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-48 p-2 outline-none"
            />
            <button className="w-full bg-neutral text-white p-2">
              Save changes
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditReviewDialog;
