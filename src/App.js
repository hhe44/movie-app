import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PopularList = styled.div
`
  background: #212025;
  
`;

const Image = styled.img
`
background-image: url("http://imageurlhere.com");
`;

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
      <PopularList>
        {
          this.state.movies.map((movie) => (
              <Image key={movie.id} />
            )
          )
        }
      </PopularList>
    )
  }
}

export default App;
