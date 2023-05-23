import { useState } from "react";
import { Content } from "../components/Content";
import Sidebar from "../components/Sidebar";
import { MessageContext } from "../context/MessageContext";

function ChatPage() {
  const [chat, setChat] = useState({
    receiverId: "",
    receiverName: "",
    photoURL: "",
    conversationId: "",
  });

  return (
    <MessageContext.Provider value={{ chat, setChat }}>
      <Sidebar />
      <Content />
    </MessageContext.Provider>
  );
}

export default ChatPage;
