import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyPage = () => {
  const { dateId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!dateId) {
      setError('Date ID is missing');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to apply.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/user/apply/${dateId}`,
        {}, // You can add request body data here if needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setLoading(false);
      alert('Application successful!');
      navigate(`/date/${dateId}`);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Failed to apply for the date');
      } else {
        console.error('Error applying for date:', error);
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="apply-page">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleApply}
        disabled={loading}
        className="bg-red-600 text-white py-2 px-4 m-2 rounded-lg hover:bg-black focus:outline-none focus:ring-2 hover:text-white focus:ring-opacity-50"
      >
        {loading ? 'Applying...' : 'Confirm Application'}
      </button>
    </div>
  );
};

export default ApplyPage;
