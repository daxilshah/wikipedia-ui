"use client";

import React, { useState, useEffect } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import { SearchResult } from '../types/search-results';
import debounce from 'lodash.debounce';
import axios, { AxiosResponse } from 'axios';
import styles from "./search.module.css";
import SearchResults from './SearchResults';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 1000,
});

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const saveSearchHistory = () => {
    axios.post('http://localhost:5000/api/history', {
      params: {
        queryString: searchQuery,
      },
    })
      .then(response => {
        console.log('save response', response);
        getSearchHistory();
      })
      .catch(error => console.error(error));
  }

  const getSearchHistory = () => {
    axios.get('http://localhost:5000/api/history')
      .then((response: AxiosResponse<string[]>) => {
        console.log('response', response);
        setSearchHistory(response.data);
      })
      .catch(error => console.error(error));
  }

  const handleHistoryClick = (queryString: string) => {
    setSearchQuery(queryString);
  }

  useEffect(() => {
    const debouncedSearch = debounce((query: string) => {
      axios.get('http://localhost:5000/api/search', {
        params: {
          query: searchQuery,
        },
      })
        .then(response => {
          setSearchResults(response.data.results.search);
          saveSearchHistory();
          cache.clearAll();
        })
        .catch(error => console.error(error));
    }, 500);

    debouncedSearch(searchQuery);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  useEffect(() => {
    getSearchHistory();
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <input type="text" value={searchQuery} className={styles.searchTextbox} onChange={handleSearch} placeholder='Search here' />
      </div>
      <div className={styles.container}>
        <SearchResults searchResults={searchResults} searchHistory={searchHistory} cache={cache} handleHistoryClick={handleHistoryClick} />
      </div>
    </div>
  );
};

export default Search;