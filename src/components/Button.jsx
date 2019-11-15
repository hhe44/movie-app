import React from 'react';
import styled, {css} from 'styled-components';
import { rgba } from "polished";

const StyledButton = styled.button`
font-size: ${props => props.theme.fonts.medium};
color: black;
background: #e8e8e8;
font-weight: 800;
padding: ${props => props.theme.sizes.tiny} ${props => props.theme.sizes.small};
display: flex;
justify-content: center;
align-items: center;
margin-right: ${props => props.theme.sizes.small};
border: 1px solid #e8e8e8;
cursor: pointer;
${
  props =>  props.alt && css`
    color: #e8e8e8;
    background: ${rgba(props.theme.colors.mainBG, 0.1)};
  `
}
`;

export const Button = (props) => <StyledButton>{props.label}</StyledButton>