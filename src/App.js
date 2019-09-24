import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const List = styled.div`
  background: #212025;
  display: flex;
  flex-wrap: wrap;
`;

const MediaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 375px;
  height: 211px;
  background-image: url(${props => img_path + props.backdropPath});
  background-size: 100%;
`;

const Caption = styled.h2 `
  color: white;
  display: none;
`

const api_key = 'd2788c89c4f55d19e63381c2d04593df';
const api_movies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const api_tv = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
const img_path = 'https://image.tmdb.org/t/p/w500/';
// 6ihyJWRLEngSnlW8HKeDOH3AfSQ.jpg

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      tvShows: []
    }
  }

  async componentDidMount(){
    const response = await axios.get(api_movies);
    const response2 = await axios.get(api_tv);
    this.setState({ movies: response.data.results});
    this.setState({ tvShows: response2.data.results});
    console.log(response2);
  }

  render () {
    return ([

      <List>
      {
        this.state.movies.map((movie) => [
          <MediaWrap key={movie.id}>
            <Image backdropPath={movie.backdrop_path}/>
            <Caption>{movie.title}</Caption>
          </MediaWrap>
        ])
      }
      </List>,
      <List>
      {
        this.state.tvShows.map((tvShow) => [
          <MediaWrap key={tvShow.id}>
            <Image backdropPath={tvShow.backdrop_path}/>
            <Caption>{tvShow.name}</Caption>
          </MediaWrap>
        ])
      }
      </List>,
    ])
  }
}

export default App;
