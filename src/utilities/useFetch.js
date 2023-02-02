import { useState, useEffect } from 'react';

const useFetch = (url, optionsStr) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [responseStatus, setStatus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = JSON.parse(optionsStr);
        const response = await fetch(url, options);
        setStatus(response.status);

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const content = response.json();
        if (true) {
          setData(content);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();

    return () => {
      let success = false;
      setError(success);
    };
  }, [url, optionsStr, error]);

  return { data, responseStatus };
};

export default useFetch;
