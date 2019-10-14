import React from 'react';
import styled, {css} from 'styled-components';
import {rem} from 'polished'

// const StyledButton = styled.button`
//   font-family: impact;
//   font-size: ${(props) => props.theme.fonts.medium};
//   border: 0;
//   border-radius: ${(props) => props.theme.borderRadius};
//   margin-right: ${rem(8)};
//   background: ${(props) => props.theme.gradient};
//   color: white;
// `;

const StyledButton = styled.button`
    ${(props) => {
        const {theme} = props;
        return css`
            font-family: impact;
            font-size: ${theme.fonts.medium};
            border: 0;
            border-radius: ${theme.borderRadius};
            margin-right: ${rem(8)};
            background: ${theme.gradient};
            color: white;
        `
    }}
`

export const Button = (props) => <StyledButton onClick={props.onClick}>{props.label}</StyledButton>