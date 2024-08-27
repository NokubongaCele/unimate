import React from 'react';
import DateCard from './DateCard';

const DateListings = ({ dates }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {dates.map(date => (
        <DateCard key={date.id} date={date} />
      ))}
    </div>
  );
};

export default DateListings;
