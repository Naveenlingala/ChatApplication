import { Profile } from "./Profile";
import { Contacts } from "./Contacts";

const Sidebar = () => {
  return (
    <div id="sidepanel">
      <Profile />
      <div id="search">
        <label htmlFor="">
          <i className="fa fa-search" aria-hidden="true"></i>
        </label>
        <input type="text" placeholder="Search contacts..." />
      </div>
      <Contacts />
    </div>
  );
};

export default Sidebar;
