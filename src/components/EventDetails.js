import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../utilities/useFetch';
import formatData from '../utilities/formatData';
import fallback from '../images/fallback.png';
import '../styles/EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const apiKey = global.config.apikey;
  const detailsUrl = `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${apiKey}`;
  const inventoryUrl = `https://ed-4752816104538112.educative.run:3000/inventory/availability?events=${id}&apikey=${apiKey}`;

  let options = {
    method: 'GET'
  };

  const { data: detailsRaw, responseStatus: responseStatus1 } = useFetch(
    detailsUrl,
    JSON.stringify(options)
  );

  const { data: inventory, responseStatus: responseStatus2 } = useFetch(
    inventoryUrl,
    JSON.stringify(options)
  );

  if (!detailsRaw || !inventory) {
    return (
      <div>
        <h2>Loading details...</h2>
      </div>
    );
  } else {
    if (responseStatus1 === 200 && responseStatus2 === 200) {
      let details = formatData(detailsRaw);
      let attractions = formatData(detailsRaw['_embedded']['attractions']);
      let venues = formatData(detailsRaw['_embedded']['venues']);
      let inventoryStatus = inventory[0]['status'];

      let startDate = new Date(details.dates.start.dateTime);

      return (
        <div className='details'>
          <h1>{details.name}</h1>
          <img
            className='main-image'
            src={details.bestImage ? details.bestImage.url : fallback}
            alt={details.name}
          ></img>
          <div className='date'>
            <i className='bi bi-calendar-event'></i>
            <p>{startDate.toUTCString()}</p>
          </div>

          <div className='event-info'>
            <p>
              {details.info ? details.info : 'No event information to display.'}
            </p>
          </div>

          {details.seatmap && (
            <div className='seatmap-container'>
              <img
                alt='No seatmap'
                className='seatmap'
                src={details.seatmap.staticUrl}
              ></img>
            </div>
          )}
          <div className='inventory'>
            {inventoryStatus === 'TICKETS_AVAILABLE' && (
              <div className='available'>Tickets are available!</div>
            )}

            {inventoryStatus === 'FEW_TICKETS_LEFT' && (
              <div className='few-left'>Only a few tickets left!</div>
            )}

            {inventoryStatus === 'TICKETS_NOT_AVAILABLE' && (
              <div className='none-left'>
                Tickets are not available at this time.
              </div>
            )}

            {inventoryStatus === 'UNKNOWN' && (
              <div className='unknown'>
                The inventory status is not available at this time.
              </div>
            )}
          </div>

          <div className='data-container'>
            <h3>Attractions</h3>
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
            </div>
          </div>

          <div className='data-container'>
            <h3>Venues</h3>
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
            </div>
          </div>
        </div>
      );
    }
  }
};

export default EventDetails;
