import React from 'react';
import styled, {css} from 'styled-components';
import { rgba } from "polished";
import { rem } from "polished";

export const StyledButton = styled.button`
  ${(props) => {
      const {theme} = props;
      return css`
          font-family: Impact;
          font-size: ${theme.fonts.large};
          border: 0;
          border-radius: ${theme.borderRadius};
          margin-right: ${props => props.theme.sizes.small};
          background: ${theme.colors.red};
          color: ${theme.colors.white};
          outline: none;
          @media (max-width: 600px) {
            padding-right: ${rem(4)};
            padding-left: ${rem(4)};
            font-size: ${theme.fonts.medium};
          }
      `
  }}
`
export const Button = (props) => <StyledButton onClick={props.onClick}>{props.label}</StyledButton>

export const MediaPageButton = styled.button`
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
  ${props => props.alt && css`
      color: #e8e8e8;
      background: ${rgba(props.theme.colors.mainBG, 0.1)};
  `}
  @media (max-width: 450px) {
    margin-top: ${props => props.theme.sizes.small};
    margin-bottom: ${props => props.theme.sizes.xxLarge};
  }
`;