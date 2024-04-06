import React from 'react';
import { render } from '@testing-library/react';
import SearchResults from '@/app/components/SearchResults';
import { CellMeasurerCache } from 'react-virtualized';

describe('SearchResults component', () => {
    test('renders search results correctly', () => {
        const searchResults = [
            { title: 'Result 1', snippet: 'Snippet 1', pageid: 1 },
            { title: 'Result 2', snippet: 'Snippet 2', pageid: 2 },
        ];

        const cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 1000,
        });

        const handleClick = (query: string) => {
            console.log(query);
        }

        const { getByText } = render(<SearchResults searchResults={searchResults} searchHistory={[]} cache={cache} handleHistoryClick={handleClick} />);

        expect(getByText('Result 1')).toBeInTheDocument();
        expect(getByText('Snippet 1')).toBeInTheDocument();
        expect(getByText('Result 2')).toBeInTheDocument();
        expect(getByText('Snippet 2')).toBeInTheDocument();
    });

    test('displays correct number of search results', () => {
        const searchResults = [
            { title: 'Result 1', snippet: 'Snippet 1', pageid: 1 },
            { title: 'Result 2', snippet: 'Snippet 2', pageid: 2 },
        ];

        const cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 1000,
        });

        const handleClick = (query: string) => {
            console.log(query);
        }

        const { getAllByTestId } = render(<SearchResults searchResults={searchResults} searchHistory={[]} cache={cache} handleHistoryClick={handleClick} />);
        const resultItems = getAllByTestId('searchResults');

        expect(resultItems.length).toBe(2);
    });
});