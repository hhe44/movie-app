import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {rem} from 'polished'
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = {
    gradient: `-webkit-linear-gradient(#fd001d, #fc014f)`,
    borderRadius: rem(4),
    fonts: {
        small: rem(12),
        medium: rem(24),
        large: rem(32),
        veryLarge: rem(40),
    },
    sizes: {
        small: rem(8),
        medium: rem(16),
        large: rem(24),
        veryLarge: rem(32),
    },
    colors: {
        main: '#fd001d',
        muted: '#92908e',
        black: 'rgba(33, 32, 37, 1)',
    }
}

ReactDOM.render(
    <ThemeProvider theme={theme} >
        <App />
    </ThemeProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
