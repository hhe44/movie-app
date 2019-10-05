import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Poster = styled.img`
  height: 90vh;
  max-height: 750px;
  width: auto;
`
const Blurb = styled.div`
`
const Title = styled.h1`
`
const Tagline = styled.h3`
`
const Summary = styled.p`
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
        <Poster src={imagePath+media.poster_path}></Poster>
        <Blurb>
          <Title></Title>
          <Tagline></Tagline>
          <Summary></Summary>
        </Blurb>
      </Container>
    );
  }
}
