import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MessageContext } from "../context/MessageContext";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";

export function MessageInput({}) {
  const { chat, setChat } = useContext(MessageContext);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    // Create a message object with the necessary data
    if (message) {
      const data = {
        id: auth.currentUser.id,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        text: message,
        createdAt: Timestamp.now(),
      };

      // Add the message to the conversation in the database
      await updateDoc(doc(db, "conversations", chat.conversationId), {
        messages: arrayUnion(data),
      });

      // Clear the input field after sending the message
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <div className="wrap">
        <input
          type="text"
          value={message}
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            (e.code === "Enter" || e.code === "NumpadEnter") && sendMessage();
          }}
        />
        {/* <i className="fa fa-paperclip attachment" aria-hidden="true"></i> */}
        <button className="submit" onClick={sendMessage}>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
