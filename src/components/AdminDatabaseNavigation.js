import "./AdminDatabaseNavigation.css";

const AdminDatabaseNavigation = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-list-container">
        <div className="admin-navbar-list-title-contai">
          <button className="admin-navbar-database">Database</button>
          <button className="admin-navbar-about">About</button>
          <div className="admin-navbar-menu-container">
            <img
              className="admin-hamburger-menu-icon"
              alt=""
              src="/hamburger-menu1.svg"
            />
          </div>
          <button className="admin-navbar-help">Help</button>
        </div>
      </div>
      <div className="admin-navbar-details-container">
        <button className="admin-navbar-id">Admin ID</button>
        <div className="admin-navbar-separator" />
        <button className="admin-navbar-username">Admin Username</button>
      </div>
    </nav>
  );
};

export default AdminDatabaseNavigation;
