"use client";

import React from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { SearchResult } from '../types/search-results';
import parse from 'html-react-parser';
import styles from "./search.module.css";


const SearchResults: React.FC<{
    searchResults: SearchResult[],
    searchHistory: string[],
    cache: CellMeasurerCache,
    handleHistoryClick: (query: string) => void
}> = (props) => {

    const { searchHistory, searchResults, cache, handleHistoryClick } = props

    const renderRow = ({ index, key, style, parent }: any) => {
        return (
            <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
                <div style={style} className={styles.resultRowItem}>
                    <a href={`https://en.wikipedia.org/?curid=${searchResults[index].pageid}`} target='_blank' rel="noopener noreferrer" className={styles.resultItemTitle}>{searchResults[index].title}</a>
                    <p className={styles.resultSnippet}>{parse(searchResults[index].snippet)}</p>
                </div>
            </CellMeasurer>
        );
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.container}>
                <div className={styles.searchResults}>
                    {
                        searchResults.length ?
                            <h4 className={styles.resultsTitle}>
                                Results
                            </h4> : null
                    }
                    <AutoSizer data-testid="searchResults">
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={searchResults.length}
                                rowHeight={cache.rowHeight}
                                rowRenderer={renderRow}
                            />
                        )}
                    </AutoSizer>
                </div>
                <div className={styles.searchHistory}>
                    {
                        searchHistory.length ?
                            <h4 className={styles.resultsTitle}>
                                History
                            </h4> : null
                    }
                    <ul>
                        {searchHistory.map((query, index) => (
                            <li key={index}>
                                <a className={styles.resultItemTitle} onClick={() => handleHistoryClick(query)}>
                                    {query}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;