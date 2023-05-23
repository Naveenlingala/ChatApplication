import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import { v4 as uuid } from "uuid";

export function Messages({}) {
  const { chat, setChat } = useContext(MessageContext);
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

  useEffect(() => {
    console.log(chat.conversationId);
    console.log(chat);

    // Check if the conversation ID exists or set it to a dummy value
    if (!chat.conversationId) chat.conversationId = "dummy";

    const conversationRef = doc(db, "conversations", chat.conversationId);

    // Subscribe to conversation changes
    const unSub = onSnapshot(conversationRef, (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages);

        // Scroll to the bottom of the messages
        dummy.current.scrollIntoView({ behavior: "smooth" });
      } else {
        setMessages([]);
      }
    });

    // Unsubscribe from conversation changes when the component unmounts
    return () => unSub();
  }, [chat]);

  return (
    <div className="messages">
      <ul>
        {messages.map((message) => (
          <li
            key={uuid()} // Generate a unique key for each message
            className={message.id === auth.currentUser.id ? "replies" : "sent"} // Use strict equality
          >
            <img src={message.photoURL} alt="" />
            <div>
              <div className="user-messages">
                <h6>{message.name}</h6>
              </div>
              <div>
                <p>{message.text}</p>
              </div>
            </div>
          </li>
        ))}
        <div ref={dummy}></div>
      </ul>
    </div>
  );
}
