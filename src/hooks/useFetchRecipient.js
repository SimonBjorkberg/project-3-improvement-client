import { useState, useEffect } from "react";
import chatService from "../services/chat.service";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
      const getUser = async () => {
        if (!recipientId) return null;
  
        const response = await chatService.findUser(recipientId);
  
        if (response.error) {
          setError(response.error);
        }
        setRecipientUser(response.data);
      };
  
      getUser();
  }, [recipientId]);
  return { recipientUser, error };
};
