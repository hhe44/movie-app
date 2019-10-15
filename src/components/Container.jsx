import React from 'react';
import styled, {css} from 'styled-components';

const StyledContainer = styled.div`
    ${(props) => {
        const {theme} = props;
        return css`
            max-width: 1400px;
            width: 100vw;
            padding: 0 ${theme.sizes.veryLarge};
            box-sizing: border-box;
        `
    }}
`

export const Container = () => <StyledContainer></StyledContainer>