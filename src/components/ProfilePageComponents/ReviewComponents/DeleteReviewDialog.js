import reviewService from "../../../services/review.service";
const DeleteReviewDialog = ({
  setSuccessMessage,
  deleteModalId,
  review,
  setUserReviews,
  userReviews,
}) => {
    
  const handleReviewDelete = async () => {
    await reviewService.deleteReview(review._id);
    const filteredReviews = userReviews.filter((oneReview) => {
      if (oneReview._id !== review._id) {
        return oneReview;
      }
    });
    setUserReviews(filteredReviews);
    setSuccessMessage("Review has been removed")
  };

  return (
    <dialog id={deleteModalId} className="rounded-sm hover:cursor-default">
      <div className="flex flex-col p-3">
        <h1 className="px-4 py-1 text-center text-md">
          Are you sure you wish to delete your review?
        </h1>
        <div className="w-full">
          <div className="flex flex-row w-full justify-center">
            <button
              onClick={() => {
                const modal = document.getElementById(deleteModalId);
                modal.close();
              }}
              className="border-2 border-neutral text-neutral hover:text-white hover:bg-neutral w-1/4 p-1 mx-0.5"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleReviewDelete();
                const modal = document.getElementById(deleteModalId);
                modal.close();
              }}
              className="border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 w-1/4 p-1 mx-0.5"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteReviewDialog;
