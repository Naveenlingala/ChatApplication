import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export function Contact({ isGroup, contactId, isSearch, setName }) {
  const { chat, setChat } = useContext(MessageContext);

  // Determine the collection name based on the contact type
  const collectionName = isGroup
    ? "group-chat"
    : isSearch.current
    ? "users"
    : "private-chat";

  const [result, setRes] = useState({
    photoURL: "",
    name: "",
    lastMessage: "",
    id: "",
  });

  const docRef = doc(db, collectionName, contactId);
  const userRef = doc(db, "users", auth.currentUser.id);

  useEffect(() => {
    const unSub = onSnapshot(docRef, (doc) => {
      if (!doc.data()) {
        setChat({
          receiverId: "",
          receiverName: "",
          photoURL: "",
          conversationId: "",
        });
      } else {
        var userData = doc.data();
        var name = userData.name || userData[auth.currentUser.id].name;
        var lastMessage = isSearch.current
          ? `Click to ${isGroup ? "Join Group" : "Add User"}`
          : userData.lastMessage;

        var photoURL =
          userData.photoURL ||
          (userData[auth.currentUser.id]
            ? userData[auth.currentUser.id].photoURL
            : "") ||
          "/group.png";
        var id = doc.id || "";
        var conversationId = userData.conversationId || "";

        setRes({ name, photoURL, lastMessage, id, conversationId });
      }
    });

    // Clean up subscription
    return () => unSub();
  }, []);

  const viewChat = async () => {
    var data = {
      receiverId: result.id,
      receiverName: result.name,
      photoURL: result.photoURL,
      conversationId: result.conversationId,
    };

    if (isSearch.current) {
      if (isGroup) {
        if ((await getDoc(doc(db, "group-chat", contactId))).data()) {
          updateDoc(userRef, {
            groupChats: arrayUnion(contactId),
          });
          // Update group chat's members list
          updateDoc(docRef, {
            members: arrayUnion(auth.currentUser.id),
          });
        } else {
          data = {
            receiverId: "",
            receiverName: "",
            photoURL: "",
            conversationId: "",
          };
        }
        // Update user's group chat list
      } else {
        const user1 = auth.currentUser.id;
        const user2 = result.id;
        const getId = user1 > user2 ? user2 + user1 : user1 + user2;

        if ((await getDoc(doc(db, "private-chat", getId))).data()) {
          console.log("Already present");
        } else {
          await addDoc(collection(db, "conversations"), { messages: [] }).then(
            async (e) => {
              data["conversationId"] = e["id"];
              const privateData = {
                lastMessage: "",
              };
              privateData[user1] = {
                name: result.name,
                photoURL: result.photoURL,
              };
              privateData[user2] = {
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
              };
              privateData["conversationId"] = data["conversationId"];

              setDoc(doc(db, "private-chat", getId), privateData).then((e) => {
                // Add User1 to contact list
                updateDoc(doc(db, "users", user1), {
                  privateChats: arrayUnion(getId),
                });
                // Add Second User to his contact list
                updateDoc(doc(db, "users", user2), {
                  privateChats: arrayUnion(getId),
                });
                data["receiverId"] = getId;
              });
            }
          );
        }
      }

      setRes((e) => ({ ...e, lastMessage: "" }));
      isSearch.current = false;
      setName("");
    }
    console.log(data);
    await setChat(data);
  };

  return (
    <li className="contact" onClick={viewChat}>
      <div className="wrap">
        <img src={isGroup ? "/group.png" : result.photoURL} alt="" />
        <div className="meta">
          <p className="name">{result.name}</p>
          <p className="preview">{result.lastMessage}</p>
        </div>
      </div>
    </li>
  );
}
