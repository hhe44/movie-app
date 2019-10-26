import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Title, Overview } from "../components/Typography";

const MediaPageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`
const Image = styled.img`
  // height: calc( 100vh - ${props => props.theme.sizes.xxLarge} );
  width: 100%;
`
const MediaDetails = styled.div`
  width: 40%;
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, 0%);
  box-sizing: border-box;
  padding: ${props => props.theme.sizes.medium};
  background: rgba(20, 20, 20, 0.5);
  border-radius: ${props => props.theme.sizes.tiny};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1600px) {
    top: 50%;
    width: 50%;
  }
  @media (max-width: 1200px) {
    top: 40%;
    width: 50%;
  }
`
const StyledTitle = styled(Title)`
  font-size: ${props => props.theme.fonts.xLarge};
`

const Tagline = styled.h3`
  font-family: Impact;
  font-style: italic;
  font-size: ${props => props.theme.fonts.large};
  font-weight: 1000;
  padding-top: ${props => props.theme.sizes.small};
  padding-bottom: ${props => props.theme.sizes.medium};
  color: ${props => props.theme.colors.white};
  text-align: center;
`;

const Buttons = styled.div`
`;

export default class MediaPage extends React.PureComponent {
  state = {
    media: []
  };

  async componentDidMount() {
    const param = this.props.match.url.split("/");
    const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${param[2]}?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(getMediaDetail);
    this.setState({ media: response.data });
  }

  render() {
    const { media } = this.state;
    const imagePath = "https://image.tmdb.org/t/p/original";
    return (
      <MediaPageContainer>
        <Image src={imagePath + media.backdrop_path}></Image>
        <MediaDetails>
          <StyledTitle>{media.title || media.name}</StyledTitle>
          <Tagline>{media.tagline}</Tagline>
          <Overview>{media.overview || media.biography}</Overview>
          <Buttons>
            <Button label={ media.release_date || media.last_air_date ? "WATCH NOW" : "VISIT PROFILE" }></Button>
            <Link to={{ pathname: '/mediahomepage', state: { homepageurl: media.homepage} }}>
              <Button label={ media.release_date || media.last_air_date ? "VISIT HOMEPAGE" : "MORE DETAILS"}></Button>
            </Link>
          </Buttons>
        </MediaDetails>
      </MediaPageContainer>
    );
  }
}
