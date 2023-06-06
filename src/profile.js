import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    photo: '',
    name: '',
    email: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch user data from the database
    fetch('http://127.0.0.1:5000/user?email=soni@gmail.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile({
          photo: data.photo,
          name: data.name,
          email: data.email
        });
      })
      .catch((error) => {
        console.log('An error occurred while fetching user data:', error);
      });
  }, []);

  const handleUpdateProfile = () => {
    // Logic to handle the update profile functionality
    console.log('Updating profile...');

    // Navigate to the update-profile page
    navigate('/updateprofile');
  };

  const handleFileSelect = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>User Profile</h2>
        <div className="card mb-3">
          <img src={selectedFile || profile.photo} className="card-img-top rounded-circle" alt="Profile" />
          <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text">{profile.email}</p>
          </div>
        </div>
        <input type="file" onChange={handleFileSelect} accept="image/*" />
        <button onClick={handleUpdateProfile} className="btn btn-success w-100">
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
