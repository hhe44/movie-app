import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Button } from "../components/Button";
import { MediaPageContainer } from "../components/Container";
import { Title, Blurb, MediaDetail, Overview } from "../components/Typography";

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
const Tagline = styled.h3`
  font-family: Impact;
  font-style: italic;
  font-size: ${props => props.theme.fonts.xLarge};
  font-weight: 1000;
  padding-bottom: ${props => props.theme.sizes.medium};
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
      <MediaPageContainer>
        <ColumnOne>
          <Poster src={imagePath + media.poster_path}></Poster>
        </ColumnOne>
        <ColumnTwo>
          <Blurb>
            <Title>{media.title || media.name}</Title>
            <Tagline>{media.tagline}</Tagline>
            <MediaDetail>
              {media.release_date
                ? "Release Date: " + media.release_date
                : "Last Aired: " + media.last_air_date}
            </MediaDetail>
            <MediaDetail>Rating: {media.vote_average} / 10</MediaDetail>
            <Overview>{media.overview}</Overview>
            <Buttons>
              <Button label={"WATCH NOW"}></Button>
              <Button label={"VISIT HOMEPAGE"}></Button>
            </Buttons>
          </Blurb>
        </ColumnTwo>
      </MediaPageContainer>
    );
  }
}
