import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-red-600 flex flex-col items-center justify-center p-6 pb-52">
      <h1 className="text-4xl text-white font-bold mb-24 mt-14">Contact Us</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg text-center">
        <p className="text-gray-700 text-lg mb-4">
          We would love to hear from you! You can reach us through the following methods:
        </p>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">Phone:</h2>
          <p className="text-gray-700">+27 72 567 7682</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">Email:</h2>
          <p className="text-gray-700">unimate@gmail.com</p>
        </div>  
        </div>
      </div>
  );
};

export default ContactUs;
