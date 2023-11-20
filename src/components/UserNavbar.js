import "../css/UserNavbar.css";

const UserNavbar = ({addNavbarDropdownComponent, setAddNavbarDropdownComponent, dropdownRef}) => {

    return (
    <nav className="user-navbar" ref={dropdownRef}>
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
            src="../img/hamburger-menu1.svg" onClick={() => setAddNavbarDropdownComponent(!addNavbarDropdownComponent)}
          />
          <a href= "/">
            <button className="user-navbar-profs">Profs</button>
          </a>
          <a href= "./Admin">
            <button className="user-navbar-courses">Courses</button>
          </a>
          <a href= "./UserMainPage">
            <button className="user-navbar-home">Home</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
