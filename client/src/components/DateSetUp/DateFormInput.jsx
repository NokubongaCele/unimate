import React from 'react';

const DateFormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-white mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
    </div>
  );
};

export default DateFormInput;