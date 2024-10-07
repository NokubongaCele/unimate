import React, { useState } from 'react';


const allInterests = [
  'Music', 'Sports', 'Movies', 'Travel', 'Reading', 'Cooking', 
  'Gaming', 'Fitness', 'Art', 'Technology', 'Nature', 'Fashion',
];

const InterestsInput = () => {
  const [formData, setFormData] = useState({
    interests: [],
  });
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(allInterests);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      
      setSuggestions(allInterests.filter((interest) =>
        interest.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  };

  const handleAddInterest = (interest) => {
    if (!formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(interest => interest !== interestToRemove),
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-white mb-2" htmlFor="interests">Interests</label>
      <input
        type="text"
        id="interests"
        name="interests"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder="Type to search interests..."
        
      />
      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <div className="bg-white border border-gray-300 mt-2 rounded-lg max-h-40 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleAddInterest(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {/* Display selected interests as tags */}
      <div className="mt-2 flex flex-wrap">
        {formData.interests.map((interest) => (
          <span
            key={interest}
            className="bg-red-600 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            {interest}
            <button
              onClick={() => handleRemoveInterest(interest)}
              className="ml-2 text-white hover:text-gray-200"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default InterestsInput;
