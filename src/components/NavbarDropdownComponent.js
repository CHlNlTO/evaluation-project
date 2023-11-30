import { useMemo } from "react";
import "../css/NavbarDropdownComponent.css";

const NavbarDropdownComponent = () => {

  return (
    <div
      className="navbar-dropdown-component"
      style={{position: 'absolute', top:0 , right: 0}}
    >
      <div
        className="navbar-dropdown-logout-contain"
        style={{cursor: 'pointer', padding: 0}}
      >
        <button className="navbar-dropdown-logout">Logout</button>
      </div>
      <div
        className="navbar-dropdown-settings-conta"
        style={{cursor: 'pointer', padding: 0}}
      >
        <button className="navbar-dropdown-logout">Settings</button>
      </div>
      <div
        className="navbar-dropdown-about-containe"
        style={{cursor: 'pointer', padding: 0}}
      >
        <button className="navbar-dropdown-logout">About</button>
      </div>
      <div
        className="navbar-dropdown-account-contai"
        style={{cursor: 'pointer', padding: 0}}
      >
        <button className="navbar-dropdown-logout">Account</button>
      </div>
    </div>
  );
};

export default NavbarDropdownComponent;
