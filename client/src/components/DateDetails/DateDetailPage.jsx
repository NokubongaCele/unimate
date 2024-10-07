import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DateDetail from './DateDetail';
import ApplyButton from './ApplyButton';


const DateDetailPage = () => {
  const { dateId } = useParams(); 
  const [role, setRole] = useState(null);
  const [dateSetup, setDateSetup] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDateSetup = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/date/${dateId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        setDateSetup(response.data.data.date); 
      } catch (error) {
        console.error('Error fetching date setup:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDateSetup(); 
  }, [dateId]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://127.0.0.1:8000/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const userRole = res.data.data.user.role;
          setRole(userRole);
          console.log(`user role is ${userRole}`)
        })
        .catch((err) => {
          console.error('Error fetching user profile:', err);
        });
    }
  }, []);


  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!dateSetup) {
    return <div>Date setup not found</div>; 
  }

  return (
    <div className="date-detail-page mx-auto p-4 bg-red-600 shadow-md mt-0 pb-96 pt-20">
      <DateDetail dateSetup={dateSetup} /> 
      {role === 'applicant' && (
        <ApplyButton dateId={dateId}/>
      )}
      
    </div>
  );
};

export default DateDetailPage;
