import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  return (
    <div className="py-3 bg-white text-neutral border-gray-400 hover:bg-neutral hover:text-white">
      {!recipientUser ? (
        <p>Loading</p>
      ) : (
        <div className="flex">
          <img src={recipientUser.image} alt="pic" className="w-10 ml-2" />
          <p className="my-auto ml-2 text-lg">{recipientUser.username}</p>
        </div>
      )}
    </div>
  );
};

export default UserChat;
