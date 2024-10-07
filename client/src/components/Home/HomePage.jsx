import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from './Filters';
import DateCard from './DateCard';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
  const [dates, setDates] = useState([]); 
  const [filter, setFilter] = useState(''); 

  useEffect(() => {

    const fetchDates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user/all-dates', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        setDates(response.data.data.dates); 
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
    <div className="bg-cover bg-center min-h-screen p-4 " 
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backround-image.jpg)` }} >
      <Filters filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredDates.map((date) => (
          <DateCard key={date._id} date={date} /> 
        ))}
      </div>
    </div>
  );
};

export default HomePage;
