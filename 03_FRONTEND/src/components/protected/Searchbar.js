import React from 'react'

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" id="search-input" placeholder="Search here..." />
      <button type="button" id="search-btn">
        <span className="material-icons-sharp">search</span>
      </button>
    </div>
  )
}

export default SearchBar