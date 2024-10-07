import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAppliedDates = () => {
  const [appliedDates, setAppliedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppliedDates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user/applied-dates', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAppliedDates(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(`You haven't applied for any dates yet`);
        setLoading(false);
      }
    };

    fetchAppliedDates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (appliedDates.length === 0) {
    return <div>You haven't applied for any dates yet.</div>;
  }

  return (
    <div className="applied-dates mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliedDates.map((date) => (
          <div key={date.dateId} className="bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-black text-3xl font-bold mb-4">{date.title}</h1> 
            <p className='text-black'><strong>Created By: </strong> {date.createdBy}</p>
            <p className='text-black'><strong>Description: </strong> {date.description}</p>
            <p className='text-black'><strong>Prefered level of study: </strong> {date.level.join(', ')}</p>
            <p className='text-black'><strong>Prefered Courses: </strong> {date.courses.join(', ')}</p>
            <p className='text-black'><strong>Prefered Residence: </strong> {date.res.join(', ')}</p>
            <p className='text-black'><strong>Prefered Date Outcome: </strong> {date.goal}</p>
            <p className='text-black'><strong>Application Status: </strong> {date.status}</p>
            <p className='text-black'><strong>Interview Date: </strong> {date.interviewDate}</p> 
            <p className='text-black'><strong>Interview Link: </strong> {date.interviewLink}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAppliedDates;
