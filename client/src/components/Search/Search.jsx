import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../../Context/context';
import "./Search.css";

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const events = useContext(EventContext);

  const uniqueCategories = [...new Set(events.map(event => event.categories))];

  const handleSearch = (query, category) => {
    let queryParams = '';
    
    if (searchQuery.trim() !== '') {
      queryParams += `query=${encodeURIComponent(searchQuery)}`;
  }
  
    
    if (category) {
       queryParams += `${queryParams ? '&' : ''}category=${encodeURIComponent(category)}`;
    }
 
    navigate(`/search?${queryParams}`);
 }

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if(category) {
       handleSearch(searchQuery, category);
    }
 };

  return (
<form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>  
    <div className="search_container">
        <label className="search_label">Discover Exciting Events</label>
        <input
          placeholder="E.g. Secret Garden Gala, Music Mania Fest"
          className="search"
          name="text"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="search_dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <p className="search_description">Enter event names, themes, or your wildest interests!</p>
      </div>
    </form>
  );
}

export default Search;
