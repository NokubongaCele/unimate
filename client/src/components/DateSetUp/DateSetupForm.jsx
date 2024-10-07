import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import DateFormInput from './DateFormInput';
import axios from 'axios'; // Using axios to make HTTP requests

const DateSetupForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    age: '',
    residence: [],
    courses: [],
    description: '',
    level: [],
    interests: '',
    goal: '',
  });

  const navigate = useNavigate(); // To navigate after submission
  const [error, setError] = useState('');

  const courses = [
    'BSc Life Sciences', 'BSc Physical Sciences', 'BSc Mathematical Sciences',
    'BPharm', 'BRad', 'MBChB', 'BOH', 'BDT', 'BDS',
  ];

  const residence = [
    'Madeira Isles', 'Arebeng 1', 'Arebeng 2', 'Drie Lilles', 'Nurses Home',
    'Res 1A', 'Res 1B', 'Res 1C', 'Res 2A', 'Res 1D', 'Res 4B', 'Res 5A', 'Res 5B',
  ];

  const level = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', '6th Year']

  const handleCheckboxChangeCourses = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, courses: [...prevState.courses, value] };
      } else {
        return { ...prevState, courses: prevState.courses.filter((course) => course !== value) };
      }
    });
  };

  const handleCheckboxChangeResidence = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, residence: [...prevState.residence, value] };
      } else {
        return { ...prevState, residence: prevState.residence.filter((res) => res !== value) };
      }
    });
  };

  const handleCheckboxChangeLevel = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, level: [...prevState.level, value] };
      } else {
        return { ...prevState, level: prevState.level.filter((res) => res !== value) };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the auth token
      const response = await axios.post('http://localhost:8000/api/v1/user/dates', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token for authorization
        },
      });
      if (response.status === 201) {
        alert('Date created successfully!');
        navigate('/my-date'); // Navigate to profile or a different page
      }
    } catch (error) {
      setError('Failed to create date. Please try again.');
    }
  };

  return (
    <div className="date-setup-form mx-auto mt-0 p-4 bg-red-600 shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Create a new date</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <DateFormInput
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <DateFormInput
          label="Preferred Age"
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <div className="mb-4 bg-white border rounded-lg pl-2">
          <label className="block text-black mb-2">Preferred Student Residence</label>
          {residence.map((res) => (
            <div key={res} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={res}
                name="residence"
                value={res}
                checked={formData.residence.includes(res)}
                onChange={handleCheckboxChangeResidence}
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <label htmlFor={res} className="ml-2 text-gray-700">{res}</label>
            </div>
          ))}
        </div>
        <div className="mb-4 bg-white border rounded-lg pl-2">
          <label className="block text-black mb-2">Preferred Courses Of Study</label>
          {courses.map((course) => (
            <div key={course} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={course}
                name="courses"
                value={course}
                checked={formData.courses.includes(course)}
                onChange={handleCheckboxChangeCourses}
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <label htmlFor={course} className="ml-2 text-gray-700">{course}</label>
            </div>
          ))}
        </div>
        <div className="mb-4 bg-white border rounded-lg pl-2">
          <label className="block text-black mb-2">Preferred Level Of Study</label>
          {level.map((level) => (
            <div key={level} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={level}
                name="level"
                value={level}
                checked={formData.level.includes(level)}
                onChange={handleCheckboxChangeLevel}
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <label htmlFor={level} className="ml-2 text-gray-700">{level}</label>
            </div>
          ))}
        </div>
        <DateFormInput
          label="Hobbies and Interests"
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="description">Describe your date</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="goal">Goal of the date</label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DateSetupForm;
