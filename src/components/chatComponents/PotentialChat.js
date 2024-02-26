import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";

const PotentialChats = () => {
    const { loggedInUser } = useContext(AuthContext)
  const { potentialChats, createChat } = useContext(ChatContext);
  return (
    <div className="all-users w-64">
      {!potentialChats && <p>NONE</p>}
      {potentialChats &&
        potentialChats.map((u) => {
          return (
            <div key={u._id} onClick={() => createChat(loggedInUser._id, u._id)} className="hover:cursor-pointer mt-2 border-2 hover:bg-neutral hover:text-white w-60 py-3 bg-white text-neutral border-neutral rounded-md">
              {u.username}
              <span className="user-online"></span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
