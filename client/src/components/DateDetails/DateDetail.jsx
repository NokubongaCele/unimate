import React from 'react';

import ApplyButton from './ApplyButton';

const DateDetail = ({ dateSetup }) => {
  return (
    <div className="date-detail bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-black text-3xl font-bold mb-4">{dateSetup.title}</h2>
      <p className='text-black'><strong>Date Post By: </strong> {dateSetup.creator}</p>
      <p className='text-black'><strong>Description: </strong> {dateSetup.description}</p>
      <p className='text-black'><strong>Preferred Age: </strong> {dateSetup.preferredAge}</p>
      <p className='text-black'><strong>Preferred Residence: </strong> {dateSetup.preferredResidence.join(', ')}</p>
      <p className='text-black'><strong>Preferred Level Of Study: </strong> {dateSetup.preferredLevel}</p>
      <p className='text-black'><strong>Interests:</strong> {dateSetup.interests}</p>
      <p className='text-black'><strong>Preferred outcome of the date: </strong> {dateSetup.goal}</p>
      <p className='text-black'><strong>Preferred Courses of Study:</strong> {dateSetup.courses.join(', ')}</p>
      <ApplyButton dateId={dateSetup.id} />
    </div>
  );
};

export default DateDetail;
