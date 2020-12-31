import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Full wikipedia api path with query fields: 
// https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=programming

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDeboucedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDeboucedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm
        }
      });

      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  // Three ways to run an async function in useEffect
  // #1, most common
  // useEffect(() => {
  //   const search = async () => {
  //     const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         origin: '*',
  //         format: 'json',
  //         srsearch: term
  //       },
  //     });

  //     setResults(data.query.search);
  //   };

  //   if (term && !results.length) {
  //     search();
  //   } else {
  //     const timeoutId = setTimeout(() => {
  //       if (term) { // default option to not run search if there is no term
  //         search();
  //       }
  //     }, 500);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
    
  // }, [term]);
  // #2
  // useEffect(() => {
  //   (async () => {
  //     await axios.get('');
  //   })();
  // }, [term]);
  // #3 use normal promises, easiest to understand
  // useEffect(() => {
  //   axios.get('')
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }, [term]);

  const renderedResults = results.map(result => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a 
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`} 
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={e => setTerm(e.target.value)} 
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
}

export default Search;