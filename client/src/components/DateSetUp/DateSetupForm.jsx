import React, { useState } from 'react';
import DateFormInput from './DateFormInput';

const DateSetupForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    age: '',
    residence: [],
    courses: [],
    description: '',
    level: '',
    interests: '',
    goal: '',
  });

  const courses = [
    'BSc Life Sciences',
    'BSc Physical Sciences',
    'BSc Mathematical Sciences',
    'BPharm',
    'BRad',
    'MBChB',
    'BOH',
    'BDT',
    'BDS',
  ];

  const residence = [
    'Madeira Isles',
    'Arebeng 1',
    'Arebeng 2',
    'Drie Lilles',
    'Nurses Home',
    'Res 1A',
    'Res 1B',
    'Res 1C',
    'Res 2A',
    'Res 1D',
    'Res 4B',
    'Res 5A',
    'Res 5B',
  ]

  const handleCheckboxChangeCourses = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return {
          ...prevState,
          courses: [...prevState.courses, value],
        };
      } else {
        return {
          ...prevState,
          courses: prevState.courses.filter((course) => course !== value),
        };
      }
    });
  };

  const handleCheckboxChangeResidence = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      if (checked) {
        return {
          ...prevState,
          residence: [...prevState.residence, value],
        };
      } else {
        return {
          ...prevState,
          residence: prevState.residence.filter((residence) => residence !== value),
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="date-setup-form mx-auto mt-0 p-4 bg-red-600 shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Create a new date</h2>
      <form onSubmit={handleSubmit}>
        <DateFormInput
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <DateFormInput
          label="Prefered age range"
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <div className="mb-4 bg-white border rounded-lg pl-2">
          <label className="block text-black mb-2">Prefered Student Residence</label>
          {residence.map((residence) => (
            <div key={residence} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={residence}
                name="residence"
                value={residence}
                checked={formData.residence.includes(residence)}
                onChange={handleCheckboxChangeResidence}
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <label htmlFor={residence} className="ml-2 text-gray-700">
                {residence}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4 bg-white border rounded-lg pl-2">
          <label className="block text-black mb-2">Preferred Courses of Study</label>
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
              <label htmlFor={course} className="ml-2 text-gray-700">
                {course}
              </label>
            </div>
          ))}
        </div>
        <DateFormInput
          label="Prefered Level of study"
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
        />
        <DateFormInput
          label="Hobbies and Interests"
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
        
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="description">
            Describe how you would like your date to be
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="goal">
            The goal of the date
          </label>
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