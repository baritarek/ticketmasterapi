import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../utilities/useFetch';
import formatData from '../utilities/formatData';
import fallback from '../images/fallback.png';
import '../styles/AttractionDetails.css';

const AttractionDetails = () => {
  const { id } = useParams();
  const apiKey = global.config.apikey;
  const URL = `https://app.ticketmaster.com/discovery/v2/attractions/${id}?apikey=${apiKey}`;
  const params = {
    method: 'GET'
  };

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
      let links = details.externalLinks;

      return (
        <div className='details'>
          <h1>{details.name}</h1>
          <img
            className='main-image'
            src={details.bestImage ? details.bestImage.url : fallback}
            alt={details.name}
          ></img>

          <div className='upcoming center'>
            {details['upcomingEvents']['_total']
              ? details['upcomingEvents']['_total'] +
                ' upcoming events. Stay tuned!'
              : 'No upcoming events'}
          </div>

          {links && (
            <div className='center'>
              <h5>Connect with {details.name}</h5>
              <div className='connect'>
                {links.twitter && (
                  <a href={links['twitter'][0]['url']}>
                    <i class='bi bi-twitter'></i>
                  </a>
                )}
                {links.instagram && (
                  <a href={links['instagram'][0]['url']}>
                    <i class='bi bi-instagram'></i>
                  </a>
                )}
                {links.facebook && (
                  <a href={links['facebook'][0]['url']}>
                    <i class='bi bi-facebook'></i>
                  </a>
                )}
                {links.homepage && (
                  <a href={links['homepage'][0]['url']}>
                    <i class='bi bi-globe'></i>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
};

export default AttractionDetails;
