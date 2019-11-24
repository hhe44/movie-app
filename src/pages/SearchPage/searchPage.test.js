import React from 'react';
import {SearchPage} from './index';
import axios from 'axios';
import theme from '../../theme';
import { ThemeProvider } from 'styled-components';
import queryString from "query-string";
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import response from './dummydata.json';

jest.mock('axios');

function withTheme (Component, props) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...props} />
        </ThemeProvider>
    )
}

const search = '?page=1&searchMedia=multi&searchTerm=joker'
const url = `/search${search}`;

describe('Search Page', () => {

    it('renders nothing when there are no results', () => { 
        const props = {
            setLoading: jest.fn(),
            location: { search }
        };
        axios.get.mockResolvedValueOnce({ data: { results: [], totalPages: 0 } });
        const { debug, getByText } = render(withTheme(SearchPage, props));
        // note to self: console log debug for hints
        expect(getByText('NO RESULTS FOUND!')).toBeInTheDocument();
    }),

    it('renders results when there are results', () => {
        const props = {
            setLoading: jest.fn(),
            location: { search }
        };
        axios.get.mockResolvedValueOnce({ 
            data: {
                results: response.data.results, 
                totalPages: response.data.total_pages
            } 
        });
        const { debug, getByText } = render(withTheme(SearchPage, props));
    }),

    it('parses link correctly', () => {
        const props = {
            setLoading: jest.fn(),
            location: { search: "?page=1&searchMedia=multi&searchTerm=Joker" }
        };
        const query = queryString.parse(props.location.search);
        expect(query).toEqual({ page: '1', searchMedia: 'multi', searchTerm: 'Joker' });
    })

});