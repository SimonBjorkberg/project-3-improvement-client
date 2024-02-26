import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import ChatDrawerItem from "./ChatDrawerItem";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="max-w-md mx-auto py-10 min-h-[100vh] pt-20">
      {isUserChatsLoading ? (
        <p>Loading your contacts...</p>
      ) : (
        userChats?.map((chat, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                updateCurrentChat(chat);
                handleNavigate(chat._id);
              }}
            >
              <ChatDrawerItem user={loggedInUser} chat={chat} />
            </div>
          );
        })
      )}
      {userChats?.length === 0 && (
        <p className="text-neutral mt-20 text-xl">
          No Contacts added yet! <br />
          Go to a profile and press the Send Message button!
        </p>
      )}
    </div>
  );
};

export default UserList;
