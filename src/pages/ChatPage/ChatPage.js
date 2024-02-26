import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/chat.context";
import ChatBox from '../../components/chatComponents/ChatBox'

const ChatPage = () => {
  const { isUserChatsLoading, currentChat } = useContext(ChatContext);

  useEffect(() => {
    const scrollToBot = () => {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight });
      }, 100);
    };
    scrollToBot();
  }, [currentChat]);

  return (
    <div className="chat-page">
      {isUserChatsLoading && <p>Loading Chats...</p>}
      {!isUserChatsLoading && <ChatBox />}
    </div>
  );
};

export default ChatPage;
