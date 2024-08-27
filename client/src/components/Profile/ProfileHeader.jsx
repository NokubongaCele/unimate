import React from 'react';

const ProfileHeader = () => {
  return (
    <div className="profile-header bg-white text-black p-4 rounded-lg mb-6 flex items-center">
      <img
        src="profile.jpg"
        alt=""
        className="w-36 h-36 rounded-full mr-4"
      />
      <div>
        <h2 className="text-xl font-bold">Anna Smith</h2>
        <p>A passionate software engineer who loves to explore new technologies and meet new people. Always up for an adventure!</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
