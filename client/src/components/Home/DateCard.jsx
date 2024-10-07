import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DateCard = ({ date }) => {
  const [liked, setLiked] = useState(date.isLiked || false);

  const toggleLike = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/user/${date._id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      if (response.status === 200) {
        setLiked(!liked); 
      }
    } catch (error) {
      console.error('Error liking the date:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col mt-2">
      <h2 className="text-xl font-semibold mb-2">{date.title}</h2>
      <p className="text-gray-700 mb-2">{date.description}</p>
      <p className="text-gray-500 text-sm mb-1"><strong>Interests: </strong>{date.interests}</p>
      <p className="text-gray-500 text-sm mb-4"><strong>Preferred Courses: </strong>{date.courses.join(', ')}</p>
      <div className="mt-auto flex justify-between items-center">
        <Link to={`/date/${date._id}`}>
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View Date
          </button>
        </Link>
        <button
          onClick={toggleLike}
          className={`text-2xl ${liked ? 'text-red-600' : 'text-black'} hover:text-red-600 focus:outline-none`}
        >
          <i className={`fas ${liked ? 'fa-heart' : 'fa-heart'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default DateCard;
