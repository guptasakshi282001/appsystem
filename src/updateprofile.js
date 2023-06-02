import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    // Perform the API call to update the user profile
    fetch('http://127.0.0.1:5000/update-profile', {
      method: 'PUT', // Assuming the server uses the PUT method for updates
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then((response) => {
        if (response.ok) {
          console.log('Profile updated successfully');
          navigate('/profile'); // Redirect to the profile page after successful update
        } else {
          console.log('Failed to update profile');
          // Handle the failed update case
        }
      })
      .catch((error) => {
        console.log('An error occurred during profile update:', error);
        // Handle the error case
      });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={profile.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={profile.email} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleUpdateProfile}>Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
