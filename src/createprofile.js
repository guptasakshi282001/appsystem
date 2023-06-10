import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./api";

const CreatePage = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const shareToProfilePage = async (image, caption) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);

      const response = await axiosInstance.post('/api/profiles', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        nav('/profile');
      } else {
        console.error('Error saving profile');
      }
    } catch (error) {
      console.error('Error saving profile', error);
    }
  };

  const handleShareClick = () => {
    shareToProfilePage(image, caption);
  };

  return (
    <div>
      <h1>Create Profile page</h1>
      <div>
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={handleCaptionChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button onClick={handleShareClick}>Share</button>
    </div>
  );
};

export default CreatePage;
