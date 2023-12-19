import './AdminDropdownComponent.css'

const AdminDropdownComponent = ({items, style, setItem, closeDropdown}) => {

  return (
    <div className="admin-dropdown-container" style = {style}>
      {items && items.map(item => {
        return(
          <div className="admin-item-component" key = {item.id} onClick = {() => {setItem(item); closeDropdown()}}>
            <div className="admin-item-container">
              <button className="admin-item-title">{item.name}</button>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default AdminDropdownComponent;

// register-course-dropdown-list-
// admin-dropdown-container

// register-course-component
// admin-item-component

// register-course-dropdown-list-1
// admin-item-container

// register-course-dropdown-list-2
// admin-item-title


// const AdminDropdownComponent = ({items}) => {

//   return (
//     <div className="admin-dropdown-container">
//       {items && items.map(item => {
//         return(
//           <div className="admin-item-component">
//             <div className="admin-item-container">
//               <button className="admin-item-title">{item.name}</button>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   );
// };