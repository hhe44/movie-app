import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import {SearchPage} from './index';
import theme from '../../theme';

jest.mock('axios');

function withTheme (Component, props) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...props} />
        </ThemeProvider>
    )
}

it.only('<SearchPage />', () => {
    const search = '?page=1&searchMedia=multi&searchTerm=joker'
    const url = `/search${search}`;
    const props = {
        setLoading: jest.fn(),
        location: {
            search
        }
    }
    axios.get.mockResolvedValueOnce({
        data: { results: [], totalPages: 0 },
    });
    const { debug, getByText } = render(withTheme(SearchPage, props))
    // note to self: console log debug for hints
    expect(getByText('NO RESULTS FOUND!')).toBeInTheDocument()

})