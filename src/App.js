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
  width: 90vw;
  background: #212025;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const MediaWrap = styled.div`
`

const Image = styled.img`
  width: 375px;
  height: 211px;
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
const api_tv = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
const img_path = 'https://image.tmdb.org/t/p/w500/';

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
    return (
      <Content>
        <List key="list1">
        {
          this.state.movies.map((movie) => [
            <MediaWrap key={movie.id}>
              <Image key={movie.id+'image'} backdropPath={movie.backdrop_path}/>
              <Caption key={movie.id+'cap'}>{movie.title}</Caption>
            </MediaWrap>
          ])
        }
        </List>,
        <List key="list2">
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
