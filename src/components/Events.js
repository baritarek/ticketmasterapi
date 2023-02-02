import React from 'react';
import useFetch from '../utilities/useFetch';
import formatData from '../utilities/formatData';
import fallback from '../images/fallback.png';
import '../styles/Events.css';

const Events = () => {
  const apiKey = global.config.apikey;
  const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}`;
  let options = {
    method: 'GET'
  };

  const { data: eventsRaw, responseStatus } = useFetch(
    url,
    JSON.stringify(options)
  );

  if (!eventsRaw) {
    return (
      <div>
        <h1>Suggested events</h1>
        <p> Loading... </p>
      </div>
    );
  } else if (responseStatus === 200) {
    let events = formatData(eventsRaw['_embedded']['events'], false);

    return (
      <div>
        <h1>Suggested events</h1>
        <div className='data-list'>
          {events.map((event) => (
            <a key={event.id} href={'/events/' + event.id}>
              <div className='list-item'>
                <img
                  alt={event.name}
                  src={event.bestImage ? event.bestImage.url : fallback}
                ></img>
                <div className='item-text'>
                  <p className='list-title'>{event.name}</p>
                  <p className='list-info'>
                    {new Date(
                      event['dates']['start']['localDate']
                    ).toDateString()}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
};

export default Events;
