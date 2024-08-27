import React, { useEffect, useState } from 'react';

const TermsOfService = () => {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    fetch('/terms.json')
      .then(response => response.json())
      .then(data => setTerms(data))
      .catch(error => console.error('Error fetching terms:', error));
  }, []);

  return (
    <div className="bg-red-600 min-h-screen p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        {terms.map(term => (
          <div key={term.id} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{term.title}</h2>
            <p className="text-gray-700">{term.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsOfService;
