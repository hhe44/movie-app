import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  background: red;
  color: white;
`;

const Header = styled.h2`
  color: ${props => props.isEven ? 'green' : 'blue' };
`;




const api = 'https://api.themoviedb.org/3/discover/movie?api_key=d2788c89c4f55d19e63381c2d04593df&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [] 
    }
  }

  async componentDidMount(){
    const response = await axios.get(api)

    this.setState({ movies: response.data.results})
  }

  render () {
    return (
      <Container  >
        {
          this.state.movies.map((movie, index) => (
          <Header
            isEven={index % 2 === 0}
            key={movie.id} 
            >{movie.title}</Header>))
        }
        
      </Container>

    )
  }
}

export default App;
