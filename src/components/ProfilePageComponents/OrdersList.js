import { useEffect, useState } from "react";
import OrdersDialog from "./OrdersDialog";

const OrdersList = ({ foundUser, userId }) => {
  const [orders, setOrders] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setOrders(foundUser?.orders);
  }, [userId, foundUser]);

  useEffect(() => {
    const ordersCopy = [...foundUser.orders];
    if (ordersCopy.length > 5 && !showMore) {
      const fiveRecent = ordersCopy.slice(Math.max(ordersCopy.length - 5, 1));
      setOrders(fiveRecent);
    } else {
      setOrders(foundUser?.orders);
    }
  }, [foundUser.orders, showMore]);

  return (
    <div className="flex lg:w-[900px] mx-auto py-10 flex-col">
      {orders.map((order, index) => {
        const modalId = `modal-${order._id}`;
        return (
          <div
            className="flex flex-col w-[90%] mx-auto my-1 justify-between p-2 hover:bg-neutral-300 hover:cursor-pointer"
            key={order._id}
            onClick={() => {
              const modal = document.getElementById(modalId);
              if (modal) {
                modal.showModal();
              }
            }}
          >
            <p>
              Order
              <br />#{index + 1}
            </p>
            <div className="flex-row text-left"></div>
            <OrdersDialog
              modalId={modalId}
              index={index}
              order={order}
              foundUser={foundUser}
            />
          </div>
        );
      })}
      {!showMore && foundUser?.orders.length > 5 && (
        <div className="mt-5 lg:w-[900px] flex justify-center mx-auto">
          <button onClick={() => setShowMore(true)} className="w-fit">
            Show More
          </button>
        </div>
      )}
      {showMore && (
        <div className="mt-5 lg:w-[900px] flex justify-center mx-auto">
          <button
            onClick={() => {
              setShowMore(false);
            }}
            className="w-fit"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
