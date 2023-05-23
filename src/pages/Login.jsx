import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  where,
  query,
  onSnapshot,
  limit,
  getDocs,
} from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const usersRef = collection(db, "users");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, photoURL, email } = result.user;

      // Check if user exists in the collection
      const userQuery = query(usersRef, where("email", "==", email), limit(1));
      const userSnapshot = await getDocs(userQuery);
      let userFound = "";
      userSnapshot.forEach((doc) => {
        userFound = doc.id;
      });

      if (!userFound) {
        // Initialize user in the collection
        const userData = {
          name: displayName,
          photoURL,
          email,
          privateChats: [],
          groupChats: [],
        };
        await addDoc(usersRef, userData).then((e) => (userFound = e["id"]));
        console.log("New User");
      }
      auth.currentUser.id = userFound;
      navigate("/chat");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <>
      <img src="src/assets/icon.png" className="login-icon" />
      <button
        type="button"
        className="login-with-google-btn"
        onClick={signInWithGoogle}
      >
        <div className="login-text">Sign in with Google</div>
      </button>
    </>
  );
}

export default Login;
