import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DateDetail from './DateDetail';

const DateDetailPage = () => {
  const { dateId } = useParams();
  const [dateSetup, setDateSetup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDateSetups = async () => {
      try {
        const response = await fetch('/date.json');
        const data = await response.json();
        const date = data.find((item) => item.id === dateId);
        setDateSetup(date);
      } catch (error) {
        console.error('Error fetching date setups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDateSetups();
  }, [dateId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dateSetup) {
    return <div>Date setup not found</div>;
  }

  return (
    <div className="date-detail-page mx-auto p-4 bg-red-600 shadow-md mt-0 pb-96 pt-20">
      <DateDetail dateSetup={dateSetup} />
    </div>
  );
};

export default DateDetailPage;
