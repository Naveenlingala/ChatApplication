import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export function Profile({}) {
  const navigate = useNavigate();
  const { displayName, photoURL } = auth.currentUser;
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div id="profile">
      <div className="wrap">
        <img id="profile-img" src={photoURL} className="online" alt="" />
        <p>{displayName}</p>
        <img
          className="logout-icon"
          src="/signout.png"
          onClick={logout}
        />
      </div>
    </div>
  );
}
