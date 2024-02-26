import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const ChatDrawerItem = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  return (
    <div className="mb-2">
      {!recipientUser ? (
        <p>Loading</p>
      ) : (
        <div
          className="flex border py-2 hover:cursor-pointer hover:bg-neutral hover:text-white"
        >
          <div className="avatar">
            <div className="w-10 rounded-xl">
            <img src={recipientUser.image} alt="pic" className="ml-2" />
            </div>
          </div>
          <p className="my-auto ml-2 text-lg">{recipientUser.username}</p>
        </div>
      )}
    </div>
  );
};

export default ChatDrawerItem;
