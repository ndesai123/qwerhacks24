// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (query) => {
    // Call the onSearch prop with the current query
    onSearch(query);
    // TODO: handle linking to feed based on query
    // clear query
    setQuery('');
  };

  return (
    <div class = "searchbargrid">
      <input
        type="text"
        placeholder="Enter your Location"
        value={query}
        onChange={handleInputChange}
        className="search-bar"
      />
      <button class = "searchbutton buttontext" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
