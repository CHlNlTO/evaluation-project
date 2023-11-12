import { useMemo } from "react";
import "../css/NavbarDropdownComponent.css";

const NavbarDropdownComponent = ({
  navbarDropdownComponentPosition,
  navbarDropdownComponentTop,
  navbarDropdownComponentRight,
  navbarDropdownLogoutContaCursor,
  navbarDropdownLogoutContaBorder,
  navbarDropdownLogoutContaPadding,
  navbarDropdownSettingsConCursor,
  navbarDropdownSettingsConBorder,
  navbarDropdownSettingsConPadding,
  navbarDropdownAboutContaiCursor,
  navbarDropdownAboutContaiBorder,
  navbarDropdownAboutContaiPadding,
  navbarDropdownAccountContCursor,
  navbarDropdownAccountContBorder,
  navbarDropdownAccountContPadding,
}) => {
  const navbarDropdownComponentStyle = useMemo(() => {
    return {
      position: navbarDropdownComponentPosition,
      top: navbarDropdownComponentTop,
      right: navbarDropdownComponentRight,
    };
  }, [
    navbarDropdownComponentPosition,
    navbarDropdownComponentTop,
    navbarDropdownComponentRight,
  ]);

  const navbarDropdownLogoutContainStyle = useMemo(() => {
    return {
      cursor: navbarDropdownLogoutContaCursor,
      padding: navbarDropdownLogoutContaPadding,
    };
  }, [
    navbarDropdownLogoutContaCursor,
    navbarDropdownLogoutContaPadding,
  ]);

  const navbarDropdownSettingsContaStyle = useMemo(() => {
    return {
      cursor: navbarDropdownSettingsConCursor,
      padding: navbarDropdownSettingsConPadding,
    };
  }, [
    navbarDropdownSettingsConCursor,
    navbarDropdownSettingsConPadding,
  ]);

  const navbarDropdownAboutContaineStyle = useMemo(() => {
    return {
      cursor: navbarDropdownAboutContaiCursor,
      padding: navbarDropdownAboutContaiPadding,
    };
  }, [
    navbarDropdownAboutContaiCursor,
    navbarDropdownAboutContaiPadding,
  ]);

  const navbarDropdownAccountContaiStyle = useMemo(() => {
    return {
      cursor: navbarDropdownAccountContCursor,
      padding: navbarDropdownAccountContPadding,
    };
  }, [
    navbarDropdownAccountContCursor,
    navbarDropdownAccountContPadding,
  ]);

  return (
    <div
      className="navbar-dropdown-component"
      style={navbarDropdownComponentStyle}
    >
      <div
        className="navbar-dropdown-logout-contain"
        style={navbarDropdownLogoutContainStyle}
      >
        <button className="navbar-dropdown-logout">Logout</button>
      </div>
      <div
        className="navbar-dropdown-settings-conta"
        style={navbarDropdownSettingsContaStyle}
      >
        <button className="navbar-dropdown-logout">Settings</button>
      </div>
      <div
        className="navbar-dropdown-about-containe"
        style={navbarDropdownAboutContaineStyle}
      >
        <button className="navbar-dropdown-logout">About</button>
      </div>
      <div
        className="navbar-dropdown-account-contai"
        style={navbarDropdownAccountContaiStyle}
      >
        <button className="navbar-dropdown-logout">Account</button>
      </div>
    </div>
  );
};

export default NavbarDropdownComponent;
