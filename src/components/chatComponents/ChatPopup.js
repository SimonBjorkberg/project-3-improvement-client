import { useContext, useState, useEffect } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/chat.context";
import moment from "moment";

const ChatPopup = ({ chat, user, handleClick, active }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { currentChat, messages, sendTextMessage } = useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    function scrollToBottom() {
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    scrollToBottom();
  }, [active, messages]);

  return (
    <div className="chat-popup flex flex-col-reverse">
      <div className="bottom-0 right-0 z-20">
        <p
          className="py-2 px-11 bg-neutral text-white hover:cursor-pointer"
          onClick={handleClick}
        >
          {recipientUser?.username}
        </p>
      </div>
      <div
        className={`bg-white border-2 border-neutral rounded-t-md w-80 right-[149px] h-96 bottom-10 absolute ${
          active ? "block" : "hidden"
        }`}
      >
        <div className="overflow-y-scroll h-[85%]" id="chat-box">
          {messages && messages.length === 0 && (
            <p className="mt-[10vh]">
              {recipientUser ? "Start the conversation!" : null}
            </p>
          )}
          {messages?.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col chat ${
                  message?.senderId === user?._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-bubble max-w-[355px] mx-4">
                  {message.message}
                </div>
                <span className="text-xs mb-1 text-gray-500">
                  {moment(message.createdAt).calendar()}
                </span>
              </div>
            );
          })}
        </div>
        <form className="h-[15%]" onSubmit={handleSubmit}>
          <input
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Message..."
            className="bg-white w-full text-neutral border-t border-neutral px-2 h-full focus:outline-none"
          />
          <button
            onClick={() =>
              sendTextMessage(
                textMessage,
                user._id,
                currentChat._id,
                setTextMessage
              )
            }
          ></button>
        </form>
      </div>
    </div>
  );
};

export default ChatPopup;
