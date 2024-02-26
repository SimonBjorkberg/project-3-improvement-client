import { createContext, useState, useEffect, useCallback } from "react";
import chatService from "../services/chat.service";
import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { io } from "socket.io-client";

const ChatContext = createContext();

function ChatProviderWrapper({ children }) {
  const { loggedInUser } = useContext(AuthContext);
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(true);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_API_URL || "http://localhost:443");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [loggedInUser]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", loggedInUser?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== loggedInUser?._id);
    socket.emit("sendMessage", {
      newMessage,
      recipientId,
      chatId: currentChat._id,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    if (loggedInUser) {
      const getUsers = async () => {
        const response = await chatService.findAllUsers();

        if (response.err) {
          return console.log(response.err);
        }

        const pChats = response.data.filter((pUsers) => {
          let isChatCreated = false;

          if (loggedInUser._id === pUsers._id) return false;

          if (userChats) {
            isChatCreated = userChats.some((chat) => {
              return (
                chat.members[0] === pUsers._id || chat.members[1] === pUsers._id
              );
            });
          }

          return !isChatCreated;
        });
        setPotentialChats(pChats);
      };
      getUsers();
    }
  }, [userChats, loggedInUser]);

  useEffect(() => {
    const getUserChats = async () => {
      if (loggedInUser) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await chatService.findAll(loggedInUser._id);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response.data);
      }
    };
    getUserChats();
  }, [loggedInUser]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await chatService.findChat(currentChat?._id);

      setIsMessagesLoading(false);

      if (response.err) {
        return setUserChatsError(response);
      }

      setMessages(response.data);
    };
    getMessages();
  }, [currentChat?._id]);

  const sendTextMessage = useCallback(
    async (textMessage, senderId, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("type somethin");

      const requestBody = {
        chatId: currentChatId,
        senderId: senderId,
        message: textMessage,
      };

      const response = await chatService.createMessage(requestBody);
      if (response.err) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response.data.message);
      setMessages((prev) => [...prev, response.data]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await chatService.create({ firstId, secondId });
    if (response.err) {
      return console.log(response);
    }
    setUserChats((prev) => [...prev, response.data]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
        sendTextMessageError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatProviderWrapper, ChatContext };
