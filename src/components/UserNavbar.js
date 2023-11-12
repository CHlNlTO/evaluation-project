import "../css/UserNavbar.css";

const UserNavbar = () => {

    const menuButton = () => {
        document.querySelector("user-navbar-profs").style.display = "none";
    }

    return (
    <nav className="user-navbar">
      <div className="user-student-details-container">
        <button className="user-student-name">Clark Wayne Abutal</button>
        <div className="user-separator" />
        <button className="user-student-number">S2021100408</button>
      </div>
      <div className="user-navbar-list-container">
        <div className="user-navbar-list-title-contain">
          <img
            className="user-hamburger-menu-icon"
            alt=""
            src="/hamburger-menu1.svg" onClick={menuButton}
          />
          <button className="user-navbar-profs">Profs</button>
          <button className="user-navbar-courses">Courses</button>
          <button className="user-navbar-home">Home</button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
