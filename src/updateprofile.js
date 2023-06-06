import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.baseURL = 'http://127.0.0.1:5000';
  return config;
});

function Profile() {
  const nav = useNavigate();

  const [pic, setProfile] = useState({
    photo: '',
    name: '',
    email: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/user', {
        params: {
          email: 'soni@gmail.com'
        }
      });
      const data = response.data;
      setProfile({
        photo: data.photo,
        name: data.name,
        email: data.email
      });
    } catch (error) {
      console.log('An error occurred while fetching user data:', error);
    }
  };

  const handleUpdateProfile = () => {
    console.log('Updating profile...');
    nav('/updateprofile');
  };

  const handleFileSelect = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>User Profile</h2>
        <div className="card mb-3">
          <img src={selectedFile || pic.photo} className="card-img-top rounded-circle" alt="Profile" />
          <div className="card-body">
            <h5 className="card-title">{pic.name}</h5>
            <p className="card-text">{pic.email}</p>
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
