import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Button } from "../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ColumnOne = styled.div`
  height: 90vh;
  padding: 0px ${props => props.theme.sizes.large};
`;
const ColumnTwo = styled.div`
  height: 90vh;
  max-width: 600px;
`;
const Poster = styled.img`
  height: 100%;
`;
const Blurb = styled.div`
  height: 100%;
  font-family: Helvetica;
  font-weight: 700;
  color: white;
  position: relative;
`;
const Title = styled.h1`
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
const Tagline = styled.h3`
  font-family: Impact;
  font-style: italic;
  font-size: ${props => props.theme.fonts.xLarge};
  font-weight: 1000;
  margin: 0;
`;
const MediaDate = styled.h3`
  font-size: ${props => props.theme.fonts.large};
  padding: ${props => props.theme.sizes.medium} 0;
  margin: 0;
`;
const Rating = styled.h3`
  font-size: ${props => props.theme.fonts.large};
  padding-bottom: ${props => props.theme.sizes.medium};
  margin: 0;
`;
const Overview = styled.p`
  font-size: ${props => props.theme.fonts.medium};
`;
const Buttons = styled.div`
  padding-top: ${props => props.theme.fonts.xLarge};
`;


export default class MediaPage extends React.PureComponent {
  state = {
    media: []
  };

  async componentDidMount() {
    const param = this.props.match.url.split("/");
    const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${
      param[2]
    }?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(getMediaDetail);
    this.setState({ media: response.data });
    // Uncomment line 94 to see response data in console
    // console.log(response.data);
  }

  // Little debugger function here for help...!
  print = () => {
    console.log(this.state);
    console.log(this.props.match.url);
  };

  render() {
    const { media } = this.state;
    const imagePath = "https://image.tmdb.org/t/p/original";
    return (
      <Container>
        <ColumnOne>
          <Poster src={imagePath + media.poster_path}></Poster>
        </ColumnOne>
        <ColumnTwo>
          <Blurb>
            <Title>{media.title || media.name}</Title>
            <Tagline>{media.tagline}</Tagline>
            <MediaDate>
              {media.release_date
                ? "Release Date: " + media.release_date
                : "Last Aired: " + media.last_air_date}
            </MediaDate>
            <Rating>Rating: {media.vote_average} / 10</Rating>
            <Overview>{media.overview}</Overview>
            <Buttons>
              <Button label={"WATCH NOW"}></Button>
              <Button label={"VISIT HOMEPAGE"}></Button>
            </Buttons>
          </Blurb>
        </ColumnTwo>
      </Container>
    );
  }
}
