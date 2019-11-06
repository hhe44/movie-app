import React from 'react';
import styled, {css} from 'styled-components';

const StyledButton = styled.button`
    ${(props) => {
        const {theme} = props;
        return css`
            font-family: impact;
            font-size: ${theme.fonts.large};
            border: 0;
            border-radius: ${theme.borderRadius};
            margin-right: ${props => props.theme.sizes.medium};
            background: ${theme.colors.red};
            color: ${theme.colors.white};
            outline: none;
        `
    }}
`

export const Button = (props) => <StyledButton onClick={props.onClick}>{props.label}</StyledButton>