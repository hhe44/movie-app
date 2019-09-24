import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div
`
  background: red;
  color: white;
`;

const Header = styled.h2
`
  color: ${props => props.isEven ? 'green' : 'blue' };
`;

const api_key = 'd2788c89c4f55d19e63381c2d04593df';
const api_movies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const api_tv = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
// https://image.tmdb.org/t/p/w500/6ihyJWRLEngSnlW8HKeDOH3AfSQ.jpg

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      tvShow: []
    }
  }

  async componentDidMount(){
    const response = await axios.get(api_movies);
    const response2 = await axios.get(api_tv);
    this.setState({ movies: response.data.results});
    this.setState({ tvShow: response2.data.results});
  }

  render () {
    return (
      // <Container>
      //   {
      //     this.state.movies.map((movie, index) => (
      //         <Header isEven={index % 2 === 0} key={movie.id}>{movie.title}</Header>
      //       )
      //     )
      //   }
      // </Container>
    )
  }
}

export default App;
