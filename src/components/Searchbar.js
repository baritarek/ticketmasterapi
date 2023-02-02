// import '../styles/Searchbar.css';
import React from 'react';

const Searchbar = () => {
  return (
    <>
      <h1>Search for events, attractions, or venues</h1>

      <form className='search' action='/results'>
        <div className='form-group'>
          <select className='form-select' name='type'>
            <option value='events'>Events</option>
            <option value='attractions'>Attractions</option>
            <option value='venues'>Venues</option>
          </select>
        </div>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Search...'
            name='search'
          />
          <div className='input-group-btn'>
            <button className='btn submit-btn' type='submit'>
              <i className='bi bi-search'></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Searchbar;
