import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
//import PastDates from './PastDates';

const ProfilePage = () => {
  return (
    <div className="profile-page bg-red-600 mx-auto p-4">
      <ProfileHeader />
      <ProfileDetails />
  {/*     <PastDates /> */}
    </div>
  );
};

export default ProfilePage;
