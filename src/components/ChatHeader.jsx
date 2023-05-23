import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { MessageContext } from "../context/MessageContext";
import { useContext } from "react";
import { auth, db } from "../../firebase";

export function ChatHeader() {
  // Accessing chat data from the MessageContext
  const { chat, setChat } = useContext(MessageContext);

  // Function to remove the receiver
  const removeReceiver = async () => {
    const user1 = auth.currentUser.id;

    if (chat.photoURL === "src/assets/group.png") {
      // Removing a user from a group chat
      const groupRef = doc(db, "group-chat", chat.receiverId);
      console.log("Leave group");

      // Remove the group chat from the user's groupChats array
      await updateDoc(doc(db, "users", user1), {
        groupChats: arrayRemove(chat.receiverId),
      });

      // Get the group chat data
      const groupChatSnapshot = await getDoc(groupRef);
      const membersCount = groupChatSnapshot.data().members.length;

      if (membersCount === 1) {
        // If there's only one member left in the group, delete the group chat and conversation
        await deleteDoc(
          doc(db, "conversations", groupChatSnapshot.data().conversationId)
        );
        await deleteDoc(groupRef);
        console.log("Empty Group Deleted");
      } else {
        // Remove the user from the group chat's members array
        await updateDoc(groupRef, {
          members: arrayRemove(user1),
        });
      }
    } else {
      // Removing a user from a private chat
      console.log("Remove user");
      const fullStr = chat.receiverId;

      // Determine the other user in the private chat
      const user2 = fullStr.startsWith(user1)
        ? fullStr.substring(user1.length)
        : fullStr.substring(0, fullStr.length - user1.length);

      const getId = user1 > user2 ? user2 + user1 : user1 + user2;

      // Delete the private chat and conversation
      await deleteDoc(doc(db, "private-chat", getId));
      await deleteDoc(doc(db, "conversations", chat.conversationId));

      // Remove the private chat from both users' privateChats arrays
      await updateDoc(doc(db, "users", user1), {
        privateChats: arrayRemove(getId),
      });
      await updateDoc(doc(db, "users", user2), {
        privateChats: arrayRemove(getId),
      });
    }

    // Reset the chat state
    setChat({
      receiverId: "",
      receiverName: "",
      photoURL: "",
      conversationId: "",
    });
  };

  return (
    <div className="contact-profile">
      {chat.receiverId && (
        <div>
          <img src={chat.photoURL} alt="" />
          <p>{chat.receiverName}</p>
          <button
            onClick={removeReceiver}
            style={{ border: "none", marginLeft: "0.7rem" }}
          >
            <i className="fa fa-sign-out fa-lg right" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </div>
  );
}
