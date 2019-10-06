import React from "react";
import styled from "styled-components";
import axios from "axios";

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
  padding: 0px 50px 0px 50px;
`
const ColumnTwo = styled.div`
  height: 90vh;
  width: 50vw;
  max-width: 720px;
`
const Poster = styled.img`
  height: 100%;
  width: auto;
`
const Blurb = styled.div`
  height: 100%;
  font-family: Helvetica;
  font-weight: 700;
  color: white;
  position: relative;
`
const Title = styled.h1`
  text-transform: uppercase;
  font-family: Arial;
  font-size: 4em;
  font-weight: 1000;
  letter-spacing: -2.5px;
  background: -webkit-linear-gradient(#fd001d, #fc014f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;

  @media (height > 180px) {
    font-size: 3em;
  }

`
const Tagline = styled.h3`
  font-family: Impact;
  font-style: italic;
  font-size: 3em;
  font-weight: 1000;
  margin: 0;
`
const MediaDate = styled.h3`
  font-size: 2em;
  padding: 24px 0px 24px 0px;
  margin: 0;
`
const Rating = styled.h3`
  font-size: 2em;
  padding: 0px 0px 24px 0px;
  margin: 0;
`
const Overview = styled.p`
  font-size: 1.8em;
`
const Buttons = styled.div`
  padding-top: 42px;
`
const Button = styled.button`
  font-family: impact;
  font-size: 2em;
  border: 0;
  border-radius: 4px;
  margin-right: 52px;
  background: -webkit-linear-gradient(#fd001d, #fc014f);
  color: white;
`

export default class MediaPage extends React.PureComponent {
  state = {
    media: []
  };

  async componentDidMount(){
    const param = this.props.match.url.split('/');
    const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${param[2]}?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(getMediaDetail);
    this.setState({media: response.data});
    console.log(response.data);
  }
  
  // fetchMedia = async () => {
  //   const param = this.props.match.url.split('/');
  //   const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${param[2]}?api_key=${process.env.REACT_APP_API_KEY}`;
  //   const response = await axios.get(getMediaDetail);
  //   this.setState({ media: response.data });
  //   console.log(this.state);
  // };

  // Little debugger function here for help...!
  print = () => { console.log(this.state); console.log(this.props.match.url); }

  render() {
    const { media } = this.state;
    const imagePath = "https://image.tmdb.org/t/p/w500";
    return (
      <Container>
        <ColumnOne>
          <Poster src={imagePath+media.poster_path}></Poster>
        </ColumnOne>
        <ColumnTwo>
          <Blurb>
            <Title>{media.title || media.name}</Title>
            <Tagline>{media.tagline}</Tagline>
            <MediaDate>
              {
                media.release_date ? "Release Date: " + media.release_date 
                : "Last Aired: " + media.last_air_date
              }
            </MediaDate>
            <Rating>Rating: {media.vote_average} / 10</Rating>
            <Overview>{media.overview}</Overview>
            <Buttons>
              <Button>WATCH NOW</Button>
              <Button>VISIT HOMEPAGE</Button>
            </Buttons>
          </Blurb>
        </ColumnTwo>
      </Container>
    );
  }
}
