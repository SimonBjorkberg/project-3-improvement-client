const OrdersDialog = ({ modalId, index, order, foundUser }) => {
  return (
    <dialog
      id={modalId}
      className="modal hover:cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-box rounded-md max-w-md p-0 font-light">
        <button
          onClick={() => {
            const modal = document.getElementById(modalId);
            if (modal) {
              modal.close();
            }
          }}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
        >
          ✕
        </button>
        <h1 className="w-full bg-neutral text-white p-2">Order #{index}</h1>
        <div className="">
          <h1 className="text-xl mt-2 font-bold">
            Order confirmation from Baby Marketplace
          </h1>
          <p className="my-2 text-sm p-2 text-left">
            Thank you for shopping with us! Below, you will find a summary of
            your order. Please review the information to ensure everything is
            correct. If there is any discrepancy, please contact our customer
            service by replying to this message. At the bottom of the email, you
            will also find answers to frequently asked questions.
          </p>
          <div className="">
            <p className="text-left px-2 font-bold">Customer Information</p>
            <div className="flex flex-row justify-between px-2">
              {" "}
              <p>Name: {foundUser.username}</p> <p>Email: {foundUser.email}</p>
            </div>
          </div>
          <div>
            <p className="text-left p-2 font-bold">Order Details</p>
            {order.products?.map((product) => {
              return (
                <div className="px-2 py-5 text-left" key={product._id}>
                  <p className="px-2 mb-5">{product.title}</p>
                  <div className="flex flex-row px-2">
                    <p className="w-48">Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <p className="px-2">Total: {product.price * product.quantity}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default OrdersDialog;
