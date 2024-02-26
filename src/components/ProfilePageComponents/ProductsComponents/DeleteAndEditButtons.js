const DeleteAndEditButtons = ({loggedInUser, foundUser, modalId, setEditProduct, setCategorieOptions, setWearOptions, product, deleteModalId, handleDeleteProduct}) => {
  return (
    <>
      {loggedInUser?._id === foundUser._id && (
        <div className="flex ml-auto" onClick={(e) => e.stopPropagation()}>
          <button
            className="mr-2 my-auto z-20 hover:opacity-50 text-sm"
            onClick={() => {
              const modal = document.getElementById(modalId);
              if (modal) {
                modal.showModal();
              }
              setEditProduct(product);
              setCategorieOptions(product.categories);
              setWearOptions(product.wear);
            }}
          >
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                  fill="#0F0F0F"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={() => {
              const modal = document.getElementById(deleteModalId);
              modal.showModal();
            }}
            className="my-auto z-20 text-sm hover:opacity-50 mx-2"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6.5 7.08499V21.415C6.5 21.695 6.72 21.915 7 21.915H17C17.28 21.915 17.5 21.695 17.5 21.415V7.08499"
                  stroke="#0F0F0F"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M14 5.08499H10V3.58499C10 3.30499 10.22 3.08499 10.5 3.08499H13.5C13.78 3.08499 14 3.30499 14 3.58499V5.08499Z"
                  stroke="#0F0F0F"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M5 5.08499H19"
                  stroke="#0F0F0F"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M12 10.465V17.925"
                  stroke="#0F0F0F"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M15 9.465V18.925"
                  stroke="#0F0F0F"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M9 9.465V18.925"
                  stroke="#0F0F0F"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <dialog
            id={deleteModalId}
            className="rounded-sm hover:cursor-default"
          >
            <div className="flex flex-col p-3">
              <h1 className="px-4 py-1 text-center text-xl">
                You are about to delete <br />{" "}
                <span className="font-semibold text-lg">{product.title}</span>
              </h1>
              <div className="w-full">
                <div className="flex flex-row w-full">
                  <button
                    onClick={() => {
                      const modal = document.getElementById(deleteModalId);
                      modal.close();
                    }}
                    className="border-2 border-neutral text-neutral hover:text-white hover:bg-neutral w-1/2 p-2 mx-0.5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteProduct(product._id);
                      const modal = document.getElementById(deleteModalId);
                      modal.close();
                    }}
                    className="border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 w-1/2 p-2 mx-0.5"
                  >
                    Delete
                  </button>
                </div>
                <p className="px-2 py-1 text-xs w-72 text-center font-extralight">
                  Proceeding with this action will result in the permanent
                  deletion of the selected product from our system. <br />{" "}
                  <span className="font-semibold">
                    This action cannot be undone.
                  </span>
                </p>
              </div>
            </div>
          </dialog>
        </div>
      )}{" "}
    </>
  );
};

export default DeleteAndEditButtons;
