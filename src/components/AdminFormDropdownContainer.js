import "./AdminFormDropdownContainer.css";

const AdminFormDropdownContainer = () => {
  return (
    <div className="admin-form-dropdown-container">
      <div className="admin-form-dropdown-delete-con">
        <div className="admin-form-dropdown-delete-lay">
          <img
            className="admin-form-dropdown-delete-ico-icon"
            alt=""
            src={require('../img/admin-form-dropdown-edit-icon.svg').default}
          />
          <button className="admin-form-dropdown-delete-tex">
            Delete Form
          </button>
        </div>
      </div>
      <div className="admin-form-dropdown-edit-conta">
        <div className="admin-form-dropdown-delete-lay">
          <img
            className="admin-form-dropdown-delete-ico-icon"
            alt=""
            src={require('../img/admin-form-dropdown-delete-icon.svg').default}
          />
          <button className="admin-form-dropdown-delete-tex">Edit Form</button>
        </div>
      </div>
    </div>
  );
};

export default AdminFormDropdownContainer;
