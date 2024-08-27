import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import DateCard from './DateCard';

const HomePage = () => {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch('/date.json');
        const data = await response.json();
        setDates(data);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchDates();
  }, []);

  const filteredDates = dates.filter((date) =>
    date.interests.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div className="bg-red-600 mx-auto p-4">
      <Filters filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredDates.map((date) => (
          <DateCard key={date.id} date={date} />
        ))}
      </div>
      
    </div>
  );
};

export default HomePage;
