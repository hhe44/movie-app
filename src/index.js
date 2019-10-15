import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {rem} from 'polished'
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = {
    
    borderRadius: rem(4),
    fonts: {
        tiny: rem(8),
        small: rem(16),
        medium: rem(24),
        large: rem(32),
        title: rem(64),
    },
    sizes: {
        tiny: rem(8),
        small: rem(16),
        medium: rem(24),
        large: rem(32),
        xLarge: rem(64),
        xxLarge: rem(128),
    },
    colors: {
        mainBG: 'rgba(33, 32, 37, 1)',
        red: '#fd001d',
        grey: '#92908e',
        white: '#d6d6d7',
        gradient: `-webkit-linear-gradient(#fd001d, #fc014f)`,
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
