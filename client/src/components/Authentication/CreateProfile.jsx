import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const CreateProfile = () => {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age:'',
    residence:'',
    course: '',
    bio: '',
    interests: '',
    relationship: '',
    level:'',
    picture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      picture: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="sign-up-form bg-black shadow-md p-8 rounded-lg max-w-md w-full">
        <div className="text-center mb-6">
          <img src="logo.png" alt="Logo" className="mx-auto mb-4 w-24 h-24" />
          <h1 className="font-edu-hand  text-white text-5xl font-bold mb-4">Unimate</h1>
          <h3 className="text-lg text-white font-semibold mb-2">Create Profile</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="age">Residence</label>
            <input
              type="text"
              id="residence"
              name="residence"
              value={formData.residence}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="age">Course of Study</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="age">Level of Study</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="age">Interests</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="age">Relationship Goals</label>
            <input
              type="text"
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="picture">Upload Picture</label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleFileChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="mx-auto w-24 h-24 rounded-lg" />
            </div>
          )}
          <Link to="/home"><button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-white hover:text-black">Save Profile</button></Link>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
