import React from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../utilities/useFetch';
import formatData from '../utilities/formatData';
import Searchbar from './Searchbar';
import fallback from '../images/fallback.png';
import '../styles/Results.css';

const Results = () => {
  const apiKey = global.config.apikey;
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type');
  const search = query.get('search');

  const URL = `https://app.ticketmaster.com/discovery/v2/${type}?keyword=${search}&apikey=${apiKey}`;
  const params = {
    method: 'GET'
  };

  const { data: resultsRaw, responseStatus } = useFetch(
    URL,
    JSON.stringify(params)
  );

  if (!resultsRaw) {
    return (
      <div>
        <Searchbar />

        <h4 className='search-results'>Search results for {search}</h4>
        <p> Loading... </p>
      </div>
    );
  } else if (responseStatus === 200) {
    if ('_embedded' in resultsRaw) {
      let results = formatData(resultsRaw['_embedded'][type], false);

      return (
        <div>
          <Searchbar />
          <div className='search-results'>
            <h4>Search results for {search}</h4>
            <div className='data-list'>
              {results.map((result) => (
                <a key={result.id} href={'/' + type + '/' + result.id}>
                  <div className='list-item'>
                    <img
                      alt={result.name}
                      src={result.bestImage ? result.bestImage.url : fallback}
                    ></img>
                    <div className='item-text'>
                      <p className='list-title'>{result.name}</p>
                      <p className='list-info'>
                        {type === 'events'
                          ? new Date(
                              result['dates']['start']['localDate']
                            ).toDateString()
                          : type === 'attractions'
                          ? result['classifications'][0]['genre']['name']
                          : result.city.name}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Searchbar />

          <h4 className='search-results'>
            No {type} found for {search}. Try another search.
          </h4>
        </div>
      );
    }
  }
};

export default Results;
