import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileHeader = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log("Token from profile header component: ", token);
      if (!token) {
        setError('No token found.');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data.data.user);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile details.');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  if (!userDetails) {
    return <p>No profile details found.</p>;
  }

  const profilePictureUrl = userDetails.profilePicture 
    ? `${userDetails.profilePicture}`
    : null;
  console.log("URL : ", profilePictureUrl)

  return (
    <div className="profile-header bg-white text-black p-4 rounded-lg mb-6 flex items-center">
      {profilePictureUrl ? (
        <img 
          src={profilePictureUrl} 
          alt="Profile" 
          className="w-36 h-36 rounded-full mr-4"
        />
      ) : (
        <p>No profile picture available</p>
      )}
      <div>
        <h2 className="text-xl font-bold">{userDetails.name}</h2>
        <p>{userDetails.bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
