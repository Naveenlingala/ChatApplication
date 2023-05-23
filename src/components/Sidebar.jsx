import { Profile } from "./Profile";
import { Contacts } from "./Contacts";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  where,
  query,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

const Sidebar = () => {
  const [name, setName] = useState("");
  const isSearch = useRef(false);
  const trigger = useRef(() => console.log("not-changed"));
  const usersRef = collection(db, "users");
  const docRef = doc(db, "users", auth.currentUser.id);
  const groupRef = collection(db, "group-chat");
  const [groupName, setGroupName] = useState("");
  const [results, setResults] = useState({ private: [], group: [] });

  useEffect(() => {
    if (!isSearch.current) {
      trigger.current = onSnapshot(docRef, (docSnap) => {
        setResults({
          private: docSnap.data().privateChats,
          group: docSnap.data().groupChats,
        });
      });
    } else if (name && isSearch.current) {
      // Destroy the Listener
      trigger.current();
    }
  }, [isSearch.current]);

  const createGroup = async () => {
    if (groupName) {
      const data = {
        name: groupName,
        creator: auth.currentUser.displayName,
        creator_email: auth.currentUser.email,
        members: [auth.currentUser.id],
        lastMessage: "",
        conversationId: "",
      };
      const messageRef = collection(db, "conversations");

      await addDoc(messageRef, { messages: [] }).then((e) => {
        data.conversationId = e["id"];
      });

      await addDoc(groupRef, data).then((e) => {
        updateDoc(docRef, {
          groupChats: arrayUnion(e["id"]),
        });
      });
      setName("");
      setGroupName("");
      isSearch.current = false;
      console.log("New Group Created");
    }
  };

  const handleKey = async (e) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && name) {
      const usersSearch = query(usersRef, where("name", "==", name));
      const groupSearch = query(groupRef, where("name", "==", name));
      const docSnap = await getDoc(docRef);
      const { privateChats, groupChats } = docSnap.data();
      const foundUsers = [];
      const foundGroups = [];
      const users = await getDocs(usersSearch);
      const groups = await getDocs(groupSearch);

      users.forEach((user) => {
        // Users Search with friends excluded
        const getId =
          user.id > auth.currentUser.id
            ? auth.currentUser.id + user.id
            : user.id + auth.currentUser.id;
        if (
          !(auth.currentUser.id === user.id || privateChats.includes(getId))
        ) {
          foundUsers.push(user.id);
        }
      });

      groups.forEach((group) => {
        // Groups Search with friends excluded
        if (!groupChats.includes(group.id)) {
          foundGroups.push(group.id);
        }
      });
      isSearch.current = true;
      setResults({ private: foundUsers, group: foundGroups });
    }
  };

  return (
    <div id="sidepanel">
      <Profile />

      <div id="search">
        <label htmlFor="">
          <i
            className={`fa fa-${!isSearch.current ? "search" : "close"}`}
            aria-hidden="true"
            onClick={() => {
              isSearch.current = false;
              setName("");
            }}
          />
        </label>
        <input
          type="text"
          placeholder="Search User or Groups..."
          onKeyDown={handleKey}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <Contacts results={results} isSearch={isSearch} setName={setName} />

      <div id="bottom-bar">
        <div id="search-bottom">
          <button id="addcontact" onClick={createGroup}>
            <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
            <span>Create Group</span>
          </button>
          <input
            type="text"
            value={groupName}
            placeholder="Enter Group Name... "
            onKeyDown={(e) => {
              (e.code === "Enter" || e.code === "NumpadEnter") && createGroup();
            }}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
