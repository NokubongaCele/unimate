import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import deleteUserProfile from './deleteProfile';


const ProfileDetails = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log("Token from create profile component: ", token);
      if (!token) {
        setError('No token found.');
        setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      deleteUserProfile();
      navigate('/')
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!userDetails) {
    return <p>No profile details found.</p>;
  }


  return (
    <div className="profile-details bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
      <div className="flex items-center mb-4">
        <div>
          <p className="text-gray-600">{userDetails.age} years old</p>
          <p className="text-gray-600">{userDetails.residence}</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold">Course</h4>
        <p>{userDetails.courseOfStudy}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold">Level Of Study</h4>
        <p>{userDetails.levelOfStudy}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold">Hobbies and Interests</h4>
          {userDetails.interests}
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold">Relationship Goals</h4>
        <p>{userDetails.relationshipGoals}</p>
      </div>
      {/* <div className="mb-4">
        <h4 className="text-md font-semibold">Social Media</h4>
        <ul>
          <li><a href={userDetails.socialMedia.facebook} className="text-red-500 hover:underline">Facebook</a></li>
          <li><a href={userDetails.socialMedia.twitter} className="text-red-500 hover:underline">Twitter</a></li>
          <li><a href={userDetails.socialMedia.instagram} className="text-red-500 hover:underline">Instagram</a></li>
        </ul>
      </div> */}
      <div>
      <Link to="/update-profile" className="self-start bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Update Profile
      </Link>
      <button onClick={handleDelete} className="self-start bg-red-600 text-white py-2 px-4 ml-2 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Delete Profile
      </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
