import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewMyDate = () => {
  const [dateInfo, setDateInfo] = useState(null); 
  const [numApplicants, setNumApplicants] = useState(0)
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const [message, setMessage] = useState('');
  const [interviewDate, setInterviewDate] = useState(''); 
  const [interviewLink, setInterviewLink] = useState(''); 
  const [selectedApplicant, setSelectedApplicant] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDateInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user/dates', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  
          },
        });

        if (response.data && response.data.data && response.data.data.date) {
          setDateInfo(response.data.data.date);
          setNumApplicants(response.data.data.applicantCount)
        } else {
          setError('No date found for the user.');
        }
      } catch (err) {
        console.error('Error fetching date info:', err);
        setError('Error fetching date info');
      } finally {
        setLoading(false); 
      }
    };

    fetchDateInfo();
  }, []);

  const handleReject = async (applicantId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/user/reject/${dateInfo._id}/${applicantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  
          },
        }
      );

      if (response.data.status === 'success') {
        setMessage('Application Rejected');
        setDateInfo(prevState => {
          const updatedApplicants = prevState.applicants.map(applicant =>
            applicant._id === applicantId ? { ...applicant, status: 'rejected' } : applicant
          );
          return { ...prevState, applicants: updatedApplicants };
        });
      } else {
        setError('Failed to reject applicant.');
      }
    } catch (err) {
      console.error('Error rejecting applicant:', err);
      setError('Error rejecting applicant');
    }
  };

  const handleAccept = async (applicantId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/user/accept/${dateInfo._id}/${applicantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  
          },
        }
      );

      if (response.data.status === 'success') {
        setMessage('Application Accepted');
        setDateInfo(prevState => {
          const updatedApplicants = prevState.applicants.map(applicant =>
            applicant._id === applicantId ? { ...applicant, status: 'accepted' } : applicant
          );
          return { ...prevState, applicants: updatedApplicants };
        });
      } else {
        setError('Failed to accept applicant.');
      }
    } catch (err) {
      console.error('Error accepting applicant:', err);
      setError('Error accept applicant');
    }
  };

  const handleScheduleInterview = async (applicantId) => {

    console.log('Interview Date:', interviewDate);
    console.log('Interview Link:', interviewLink);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/user/${dateInfo._id}/schedule-interview/${applicantId}`,
        {
          interviewDate,
          interviewLink
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      

      if (response.data.status === 'success') {
        setMessage('Interview scheduled successfully');
        setDateInfo(prevState => {
          const updatedApplicants = prevState.applicants.map(applicant =>
            applicant._id === applicantId
              ? { ...applicant, status: 'interview scheduled' }
              : applicant
          );
          return { ...prevState, applicants: updatedApplicants };
        });
      } else {
        setError('Failed to schedule interview.');
      }
    } catch (err) {
      console.error('Error scheduling interview:', err.response?.data || err.message || err);
      setError('Error scheduling interview');
    }
  };

  const handleDeleteDate = async () => {

    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        await axios.delete(`http://127.0.0.1:8000/api/v1/user/delete-date/${dateInfo._id}`, config);

        alert('Date deleted successfully');
        navigate('/profile');
      } catch (error) {
        console.error('Error deleting date:', error);
        alert('Failed to delete date');
      }

    }
    
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="my-date-container">
      {dateInfo ? (
        <div className="date-detail bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-black text-3xl font-bold mb-4">{dateInfo.title}</h2>            
          <p className='text-black'><strong>Description: </strong> {dateInfo.description}</p>
          <p className='text-black'><strong>Preferred Age: </strong> {dateInfo.age}</p>
          <p className='text-black'><strong>Preferred Residence: </strong> {dateInfo.residence.join(', ')}</p>
          <p className='text-black'><strong>Preferred Level Of Study: </strong> {dateInfo.level.join(', ')} year</p>
          <p className='text-black'><strong>Interests:</strong> {dateInfo.interests}</p>
          <p className='text-black'><strong>Preferred outcome of the date: </strong> {dateInfo.goal}</p>
          <p className='text-black'><strong>Preferred Courses of Study:</strong> {dateInfo.courses.join(', ')}</p>
          <button 
            className="self-start bg-red-600 text-white py-2 px-4 ml-2 mt-2 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleDeleteDate}>
            Delete Date
          </button>
        </div>
      ) : (
        <div>No date created.</div>
      )}

      <div>
      <h2 className="p-4 text-black text-3xl font-bold mb-4">{numApplicants} Applicant(s)</h2>
      {dateInfo && dateInfo.applicants.length > 0 ? (
    <ul>
    {dateInfo.applicants.map((applicant) => (
      <li key={applicant._id} className="bg-gray-100 shadow-md rounded-lg p-4 mb-4">
        <p><strong>Name: </strong>{applicant.user.name}</p>
        <p><strong>Email: </strong>{applicant.user.email}</p>
        <p><strong>Residence: </strong>{applicant.user.residence}</p>
        <p><strong>Bio: </strong>{applicant.user.bio}</p>
        <p><strong>Age: </strong>{applicant.user.age}</p>
        <p><strong>Goal: </strong>{applicant.user.relationshipGoals}</p>
        <p><strong>Course: </strong>{applicant.user.courseOfStudy}</p>
        <p><strong>Residence: </strong>{applicant.user.residence}</p>
        {message && <p className="text-green-600">{message}</p>}

        {/* Conditional rendering based on applicant status */}
        {applicant.status === "rejected" || applicant.status === "accepted" ? null : (
          <div className="mt-4 flex space-x-4">
            {applicant.status === "interview scheduled" ? (
              <>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800"
                  onClick={() => handleAccept(applicant._id)} 
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800"
                  onClick={() => handleReject(applicant._id)}
                >
                  Reject
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                  onClick={() => setSelectedApplicant(applicant._id)}
                >
                  Schedule Interview
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800"
                  onClick={() => handleReject(applicant._id)}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        )}

        {/* Render interview form if the applicant is selected */}
        {selectedApplicant === applicant._id && applicant.status !== "rejected" && (
          <div className="mt-4">
            <label className="block text-black">
              Interview Date:
              <input
                type="datetime-local"
                className="block w-full p-2 mt-2 border"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
              />
            </label>
            <label className="block text-black mt-4">
              Interview Link:
              <input
                type="url"
                className="block w-full p-2 mt-2 border"
                value={interviewLink}
                onChange={(e) => setInterviewLink(e.target.value)}
                required
              />
            </label>
            <button
            type="button"
              className="bg-green-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-green-800"
              onClick={() => handleScheduleInterview(applicant._id)}
            >
              Confirm Interview
            </button>
          </div>
        )}
      </li>
    ))}
  </ul>
) : (
  <p>No applicants yet.</p>
)}
</div>
    </div>
  );
};

export default ViewMyDate;
