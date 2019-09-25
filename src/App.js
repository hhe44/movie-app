import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Content = styled.div`
  background: #212025;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const List = styled.div`
  width: 80vw;
  background: #212025;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Header = styled.h1`
  font-family: Arial;
  font-size: 5em;
  font-weight: 1000;
  align-self: flex-start;
  position: relative;
  left: 184px;
  padding-top: 26px;
  letter-spacing: -2.5px;
  background: -webkit-linear-gradient(#fd001d, #fc014f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MediaWrap = styled.div`
`

const Image = styled.img`
  width: 250px;
  height: 140px;
  background-image: url(${props => img_path + props.backdropPath});
  background-size: 100%;
  :hover {
    opacity: 0.3;
  }
`;

const Caption = styled.h2 `
  color: white;
  display: none;
`

const api_key = 'd2788c89c4f55d19e63381c2d04593df';
const api_movies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const api_trending = `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
const api_tv = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
const img_path = 'https://image.tmdb.org/t/p/w500/';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      trending: [],
      tvShows: []
    }
  }

  async componentDidMount(){
    const response = await axios.get(api_movies);
    const response2 = await axios.get(api_trending);
    const response3 = await axios.get(api_tv);
    this.setState({ movies: response.data.results});
    this.setState({ trending: response2.data.results});
    this.setState({ tvShows: response3.data.results});
    console.log(response2);
  }

  render () {
    return (
      <Content>
        <Header>POPULAR</Header>
        <List key="list1">
        {
          this.state.movies.map((movie) => [
            <MediaWrap key={movie.id}>
              <Image key={movie.id+'image'} backdropPath={movie.backdrop_path}/>
              <Caption key={movie.id+'cap'}>{movie.title}</Caption>
            </MediaWrap>
          ])
        }
        </List>
        <Header>TRENDING</Header>
        <List key="list2">
        {
          this.state.trending.map((trend) => [
            <MediaWrap key={trend.id}>
              <Image key={trend.id+'image'} backdropPath={trend.backdrop_path}/>
              <Caption key={trend.id+'cap'}>{trend.title}</Caption>
            </MediaWrap>
          ])
        }
        </List>
        <Header>TV SHOWS</Header>
        <List key="list3">
        {
          this.state.tvShows.map((tvShow) => [
            <MediaWrap key={tvShow.id}>
              <Image key={tvShow.id+'image'} backdropPath={tvShow.backdrop_path}/>
              <Caption key={tvShow.id+'cap'}>{tvShow.name}</Caption>
            </MediaWrap>
          ])
        }
        </List>
      </Content>
    )
  }
}

export default App;
