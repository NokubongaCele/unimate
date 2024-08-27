import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Date By Interests"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
    </div>
  );
};

export default Filter;
