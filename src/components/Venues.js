import React from 'react';
import useFetch from '../utilities/useFetch';
import formatData from '../utilities/formatData';
import { useState } from 'react';

const Venue = () => {
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.APIKEY;
  const URL = `https://app.ticketmaster.com/discovery/v2/venues?apikey=${apiKey}`;

  const params = {
    method: 'GET'
  };

  const { data: venuesRow, responseStatus } = useFetch(
    URL,
    JSON.stringify(params)
  );

  if (!venuesRow) {
    return (
      <div>
        <h1>Suggested Venues</h1>
        {loading ? 'Fetching Veneues....' : 'Venues not found'}
      </div>
    );
  } else if (responseStatus === 200) {
    let venues = formatData(venuesRow('_embedded')['venues'], false);
  }

  return (
    <div>
      <h1>Suggested venues</h1>
      <div className='data-list'>
        {venues.map((venue) => (
          <a key={venue.id} href={'/venues/' + venue.id}>
            <div className='list-item'>
              <img
                alt={venue.name}
                src={venue.bestImage ? venue.bestImage.url : fallback}
              ></img>
              <div className='item-text'>
                <p className='list-title'>{venue.name}</p>
                <p className='list-info'>{venue.city.name}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Venue;
