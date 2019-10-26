import styled from "styled-components";

export const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-family: Arial;
  font-size: ${props => props.theme.fonts.title};
  font-weight: 1000;
  letter-spacing: -2.5px;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

export const MediaListTitle = styled(Title)`
  text-align: left;
  padding-top: ${props => props.theme.sizes.large};
`;

export const SearchResultTitle = styled(Title)`
  font-size: ${props => props.theme.fonts.xLarge};
  padding-bottom: ${props => props.theme.sizes.medium};
`;

export const Blurb = styled.div`
  font-family: Helvetica;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
`;

export const Caption = styled(Blurb)`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: ${props => props.theme.sizes.medium};
  font-size: ${props => props.theme.fonts.small};
  opacity: 0;
  transition: 0.2s ease-in-out;
`;

export const SearchPageBlurb = styled(Blurb)`
  width: 60%;
  padding: ${props => props.theme.sizes.veryLarge};
`;

export const MediaDetail = styled.h3`
  font-family: Helvetica;
  font-size: ${props => props.theme.fonts.large};
  padding-bottom: ${props => props.theme.sizes.medium};
  color: ${props => props.theme.colors.white};
`;

export const Overview = styled(MediaDetail)`
  font-size: ${props => props.theme.fonts.medium};
`;