import React from 'react';
import {SearchPage} from './index';
import axios from 'axios';
import theme from '../../theme';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import queryString from "query-string";
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import response from './dummydata.json';

jest.mock('axios');

const history = createMemoryHistory()

function withTheme (Component, props) {
    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
                <Component {...props} />
            </ThemeProvider>
        </Router>
    )
}
    
    
    
const search = '?page=1&searchMedia=multi&searchTerm=joker'
const url = `/search${search}`;

describe('Search Page', () => {

    it('renders nothing when there are no results', () => { 
        const props = {
            setLoading: () => {},
            location: { search }
        };
        axios.get.mockResolvedValueOnce({ data: { results: [], totalPages: 0 } });
        const { debug, getByText } = render(withTheme(SearchPage, props));
        // note to self: console log debug for hints
        expect(getByText('NO RESULTS FOUND!')).toBeInTheDocument();
    });
    it.only('renders results', () => {
        const props = {
            setLoading:() => {},
            location: { search },
            loading: false,
        };
        axios.get.mockResolvedValueOnce({ 
            data: response
        });
        const { debug, getByText } = render(withTheme(SearchPage, props));

        debug()
    });
    it('renders dropdown and forward button', () => {})

    it('renders back and forward button if age is more than 1', () => {})

    it('renders Actors in the dropdown if searchMedia is person', () => {})
    it.skip('returns to existing page if query page is too far ahead', () => {
        const search = '?page=9&searchMedia=multi&searchTerm=joker'
        const url = `/search${search}`;
        const expectedPage = 5;
        const push = jest.fn();
        const props = {
            setLoading: jest.fn(),
            location: { search },
            history: {
                push
            }
        };
        axios.get.mockResolvedValueOnce({
            data: {
                results: response.data.results,
                total_pages: expectedPage
            }
        });

        const { debug, getByText } = render(withTheme(SearchPage, props));

        expect(push).toHaveBeenCalled()

    })
});