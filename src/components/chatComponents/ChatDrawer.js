import ChatDrawerItem from "./ChatDrawerItem";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import ChatPopup from "./ChatPopup";

const ChatDrawer = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } =
    useContext(ChatContext);
  const [active, setActive] = useState(true);

  const handleClick = (show) => {
    if (show === "show") {
      return setActive(true);
    }
    setActive(!active);
  };

  return (
    <div className="drawer drawer-end absolute">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div
        id="test"
        className="fixed bottom-0 right-0 flex-row-reverse z-20 2xl:flex hidden"
      >
        <div className="drawer-container">
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="drawer-button hover:cursor-pointer"
            >
              <p className="py-2 px-11 bg-teal-600 text-white">Contacts</p>
            </label>
          </div>
        </div>
        {currentChat && (
          <ChatPopup
            handleClick={handleClick}
            active={active}
            user={loggedInUser}
            chat={currentChat}
          />
        )}
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content hidden lg:flex">
          <h1 className="text-xl">My Contacts</h1>
          {isUserChatsLoading ? (
            <p>Loading</p>
          ) : (
            userChats.map((chat, index) => {
              return (
                <label
                  key={index}
                  htmlFor="my-drawer-4"
                  className="drawer-overlay"
                >
                  <div
                    onClick={() => {
                      updateCurrentChat(chat);
                      handleClick("show");
                    }}
                  >
                    <ChatDrawerItem user={loggedInUser} chat={chat} />
                  </div>
                </label>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatDrawer;
