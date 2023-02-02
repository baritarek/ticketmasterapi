import React from 'react';
import useFetch from '../utilities/useFetch';
import Searchbar from './Searchbar';
import formatData from '../utilities/formatData';
import fallback from '../images/fallback.png';
import '../styles/Home.css';

const Home = () => {
  const apiKey = global.config.apikey;

  const url = `https://app.ticketmaster.com/discovery/v2/suggest?size=3&resource=events,venues,attractions&apikey=${apiKey}`;

  let options = {
    method: 'GET'
  };

  const { data: dataRaw, responseStatus } = useFetch(
    url,
    JSON.stringify(options)
  );

  if (!dataRaw) {
    return (
      <div className='home'>
        <Searchbar />

        <div className='data-container'>
          <h2>Suggested events</h2>
          <div className='card-container'>
            <p> Loading... </p>
          </div>
        </div>
        <div className='data-container'>
          <h2>Suggested attractions</h2>
          <div className='card-container'>
            <p> Loading... </p>
          </div>
        </div>
        <div className='data-container'>
          <h2>Suggested venues</h2>
          <div className='card-container'>
            <p> Loading... </p>
          </div>
        </div>
      </div>
    );
  } else {
    if (responseStatus === 200) {
      let events = formatData(dataRaw['_embedded']['events'], true);
      let attractions = formatData(dataRaw['_embedded']['attractions'], true);
      let venues = formatData(dataRaw['_embedded']['venues'], true);

      return (
        <div className='home'>
          <Searchbar />

          <div className='data-container'>
            <h2>Suggested events</h2>
            <div className='card-container'>
              {events.map((event) => (
                <div key={event.name} className='card'>
                  <img
                    alt={event.name}
                    src={event.bestImage ? event.bestImage.url : fallback}
                    className='card-image'
                  />
                  <div className='card-details'>
                    <p>{event.name}</p>
                    <a href={'/events/' + event.id} className='btn btn-details'>
                      View Details
                    </a>
                  </div>
                </div>
              ))}
              <a href='/events'>
                <div className='more-card'>
                  <div className='load-more'>
                    <i className='bi bi-arrow-right-circle more-icon'></i>
                    <p>Load more...</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className='data-container'>
            <h2>Suggested attractions</h2>
            <div className='card-container'>
              {attractions.map((attraction) => (
                <div key={attraction.name} className='card'>
                  <img
                    alt={attraction.name}
                    src={
                      attraction.bestImage ? attraction.bestImage.url : fallback
                    }
                    className='card-image'
                  />
                  <div className='card-details'>
                    <p>{attraction.name}</p>
                    <a
                      href={'/attractions/' + attraction.id}
                      className='btn btn-details'
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
              <a href='/attractions'>
                <div className='more-card'>
                  <div className='load-more'>
                    <i className='bi bi-arrow-right-circle more-icon'></i>
                    <p>Load more...</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className='data-container'>
            <h2>Suggested venues</h2>
            <div className='card-container'>
              {venues.map((venue) => (
                <div key={venue.name} className='card'>
                  <img
                    alt={venue.name}
                    src={venue.bestImage ? venue.bestImage.url : fallback}
                    className='card-image'
                  />
                  <div className='card-details'>
                    <p>{venue.name}</p>
                    <a href={'/venues/' + venue.id} className='btn btn-details'>
                      View Details
                    </a>
                  </div>
                </div>
              ))}
              <a href='/venues'>
                <div className='more-card'>
                  <div className='load-more'>
                    <i className='bi bi-arrow-right-circle more-icon'></i>
                    <p>Load more...</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Home;
