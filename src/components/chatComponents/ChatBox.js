import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    sendTextMessage,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, loggedInUser);
  const [textMessage, setTextMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/chat");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    function scrollToBottom() {
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex w-full">
      <div className="w-full max-h-[75vh]">
        {recipientUser ? (
          <p className="w-full top-0 z-10 bg-neutral text-white text-xl p-4">
            <span
              className="float-left hover:cursor-pointer"
              onClick={handleNavigate}
            >
              {"<"}
            </span>
            {recipientUser.username}
          </p>
        ) : (
          <p
            className="absolute w-full top-0 z-10 bg-neutral text-white text-xl p-4 text-left hover:cursor-pointer"
            onClick={handleNavigate}
          >
            {"< "}Select a contact
          </p>
        )}
        <div className="overflow-y-scroll h-full min-h-[75vh] bg-white" id="chatbox">
          {messages && messages.length === 0 && (
            <p className="mt-[35vh]">
              {recipientUser ? "Start the conversation!" : null}
            </p>
          )}
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col chat ${
                message?.senderId === loggedInUser?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble max-w-[355px] mx-4">
                {message.message}
              </div>
              <span className="text-xs mb-1 text-gray-500">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex w-full fixed">
          <input
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Message..."
            className="bg-white text-neutral border-t border-neutral w-4/5 overflow-y-auto p-2 focus:outline-none"
          />
          <button
            className="bg-neutral text-white w-1/5 border-white"
            onClick={() =>
              sendTextMessage(
                textMessage,
                loggedInUser._id,
                currentChat._id,
                setTextMessage
              )
            }
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
