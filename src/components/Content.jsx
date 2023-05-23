import { ChatHeader } from "./ChatHeader";
import { Messages } from "./Messages";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { MessageInput } from "./MessageInput";

export function Content({}) {
  const { chat, setChat } = useContext(MessageContext);

  return (
    <div className="content">
      {/* Render the chat header */}
      <ChatHeader />

      {console.log(chat)}
      {/* Render the messages */}
      {<Messages />}

      {/* Render the message input if a receiver is selected */}
      {chat.receiverId && <MessageInput />}
    </div>
  );
}
