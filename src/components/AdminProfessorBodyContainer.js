import './AdminProfessorBodyContainer.css'
import { useState, useEffect, useRef } from 'react';
import supabase from '../config/supabaseClient';

const CDNURL = "https://zcbchgefophtjpqajxiq.supabase.co/storage/v1/object/public/Evaluation-Project-Bucket/professor_image";

const AdminProfessorBodyContainer = ({professor, refresh}) => {

  const firstName = useRef(null);
  const lastName = useRef(null);

  const [editProfessor, setEditProfessor] = useState({first_name: '', last_name: ''});

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  useEffect(() => {
    if (firstName.current && lastName.current) {
      setFirstName(firstName.current.value);
      setLastName(lastName.current.value);
      setEditProfessor({first_name, last_name});
    }
    console.log(first_name);
    console.log(last_name);
    console.log(editProfessor);   

  }, [first_name, last_name]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveChanges = async (e) => {

    if(editProfessor !== null) {

    const { error } = await supabase
    .from('professors')
    .update(editProfessor)
    .eq("professor_id", professor.professor_id)

    console.log(editProfessor);

    if (error) {
        console.error('Error inserting professor:', error);
        return;
    } 
    
    refresh();
    console.log('Data inserted successfully!');
    }


    if (selectedImage) {

    const { data, error } = await supabase.storage.from('Evaluation-Project-Bucket').upload(`/professor_image${professor.professor_id}`, selectedImage);

    if (error) {
      console.error('Error uploading image:', error.message);
    } else {
      console.log('Image uploaded successfully:', data);
    }

    setSelectedImage(null);
    }

    setSelectedImage(null)
    setFirstName('')
    setLastName('')

    window.alert("Successfully edited Professor")
  };

  return (<div className="admin-body-professor-profile-c">
    <div className="admin-professor-image-containe">
      <div className="admin-professor-profile-image-">
        <div className="admin-professor-profile-image-1" />
        <img
            src={CDNURL + professor.professor_id}
            style={{ height: '100%'}}
          />
      </div>
    </div>
    <div className="admin-professor-edit-details-c">
      <div className="admin-professor-details-layout">
        <div className="admin-professor-full-name-cont">
          <div className="admin-professor-full-name-titl">
            <div className="admin-professor-full-name-titl1">
              {professor && professor.first_name}{' '}{professor && professor.last_name}
            </div>
          </div>
        </div>
        <div className="admin-professor-details-contai">
          <div className="admin-professor-first-name-con">
            <div className="admin-professor-first-name-lay">
              <div className="admin-professor-first-name-lab">
                First Name:
              </div>
              <input
                className="admin-professor-first-name-tit"
                placeholder={professor && professor.first_name}
                type="text"
                value={first_name}
                ref = {firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                tabIndex={1}
                
              />
            </div>
          </div>
          <div className="admin-professor-last-name-cont">
            <div className="admin-professor-first-name-lay">
              <div className="admin-professor-first-name-lab">
                Last Name:
              </div>
              <input
                className="admin-professor-first-name-tit"
                placeholder={professor && professor.last_name}
                type="text"
                value={last_name}
                ref = {lastName} 
                onChange={(e) => setLastName(e.target.value)}
                tabIndex={2}
              />
            </div>
          </div>
          <div className="admin-professor-change-image-c" >
            <div>
              <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} tabIndex={3} />
            </div>
          </div>
          <div className="admin-professor-save-button-co">
            <button className="admin-professor-save-button" onClick={() => {handleSaveChanges()}} tabIndex={4}>
              <div className="admin-professor-save-button-ti">
                Save Changes
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default AdminProfessorBodyContainer;