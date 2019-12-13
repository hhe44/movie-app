import styled from "styled-components";

export const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-family: Arial;
  font-size: ${props => props.theme.fonts.title};
  font-weight: 900;
  letter-spacing: -2.5px;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  @media (max-width: 600px) {
    font-size: ${props => props.theme.fonts.titleMobile};
  }
`;

export const MediaListTitle = styled(Title)`
  text-align: left;
  padding-top: ${props => props.theme.sizes.large};
`;

export const SearchResultTitle = styled(Title)`
  text-align: left;
  position: relative;
  font-size: ${props => props.theme.fonts.xLarge};
  padding-bottom: ${props => props.theme.sizes.medium};
  @media (max-width: 600px) {
    text-align: center;
    font-size: ${props => props.theme.fonts.xLarge};
  }
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
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const MediaDetail = styled.h3`
  font-family: Helvetica;
  font-size: ${props => props.theme.fonts.large};
  padding-bottom: ${props => props.theme.sizes.medium};
  color: ${props => props.theme.colors.white};
  @media (max-width: 600px) {
    font-size: ${props => props.theme.fonts.medium};
  }
`;

export const Overview = styled(MediaDetail)`
  font-size: ${props => props.theme.fonts.medium};
  @media (max-width: 600px) {
    font-size: ${props => props.theme.fonts.small};
  }
`;
