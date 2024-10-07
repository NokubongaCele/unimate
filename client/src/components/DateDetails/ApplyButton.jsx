import React from 'react';
import { Link } from 'react-router-dom';

const ApplyButton = ({ dateId }) => {
  return (
    <Link to={`/apply/${dateId}`}>
      <button className="bg-black text-white py-2 px-4 mt-2 rounded-lg hover:bg-white focus:outline-none focus:ring-2 hover:text-black focus:ring-opacity-50">
        Apply for Date
      </button>
    </Link>
  );
};

export default ApplyButton;
