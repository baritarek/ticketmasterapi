import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../utilities/useFetch';
import formatData from '../utilities/formatData';
import fallback from '../images/fallback.png';
// import '../styles/VenueDetails.css';s

function VenueDetails() {
  const { id } = useParams();
  const apiKey = process.env.APIKEY;
  const URL = `https://app.ticketmaster.com/discovery/v2/venues/${id}?apikey=${apiKey}`;

  const params = {
    method: 'GET'
  };

  const formateDate = () => {};

  const { data: detailsRaw, responseStatus } = useFetch(
    URL,
    JSON.stringify(params)
  );

  if (!detailsRaw) {
    return (
      <div>
        <h2>Loading details...</h2>
      </div>
    );
  } else {
    if (responseStatus === 200) {
      let details = formatData(detailsRaw);

      return (
        <div className='details'>
          <div class='row'>
            <div class='column left'></div>
            <div class='column right'></div>
          </div>

          <h1>{details.name}</h1>

          <img
            alt={details.name}
            className='main-image'
            src={details.bestImage ? details.bestImage.url : fallback}
          ></img>
          <div className='location'>
            <i className='bi bi-geo-alt-fill'></i>
            <p>
              {details.city.name}, {details.country.name}
            </p>
          </div>

          <hr></hr>

          {details.generalInfo && (
            <>
              <div className='venue-info'>
                <h3>General Rules and Information</h3>
                <p className='venue-rules'>{details.generalInfo.generalRule}</p>
              </div>
              <hr></hr>
            </>
          )}

          <div className='upcoming center'>
            {details['upcomingEvents']['_total']
              ? details['upcomingEvents']['_total'] +
                ' upcoming events. Stay tuned!'
              : 'No upcoming events'}
          </div>
        </div>
      );
    }
  }
}

export default VenueDetails;
