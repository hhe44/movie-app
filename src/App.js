import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './images/netflixlogo.png';
// import profileIcon from './images/noun_profile.png';

const Content = styled.div`
  background: #212025;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Navbar = styled.div`
`
const Navlist = styled.ul`
  height: 128px;
  width: 90vw;
  margin-bottom: 72px;
  position: relative;
  right: 48px;
  font-size: 1.3em;
  font-family: Nunito;
  color: #92908E;
  display: flex;
  align-items: center;
`
const NavLogo = styled.img`
  height: 60px;
  width: auto;
  margin-right: 128px;
`
const NavSearch = styled.li`
  margin-right: 64px;
`
const NavBrowse = styled.li`
`
const NavProfile = styled.li`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  margin-left: auto;
`

const UserProfile = styled.div`
  text-align: center;
  vertical-align: center;
  position: relative;
  top: 10px;
`

const List = styled.div`
  width: 80vw;
  background: #212025;
  padding-bottom: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Header = styled.h1`
  font-family: Arial;
  font-size: 5em;
  font-weight: 1000;
  align-self: flex-start;
  position: relative;
  left: 254px;
  padding-top: 26px;
  letter-spacing: -2.5px;
  background: -webkit-linear-gradient(#fd001d, #fc014f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MediaWrap = styled.div`
`

const Image = styled.img`
  width: 350px;
  height: 210px;
  margin-bottom: -3px;
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
    this.setState({movies: response.data.results});
    this.setState({trending: response2.data.results});
    this.setState({tvShows: response3.data.results});
  }

  render () {
    return (
      <Content>
        <Navbar>
          <Navlist>
            <NavLogo src={logo}></NavLogo>
            <NavSearch><i className="fa fa-search"></i></NavSearch>
            <NavBrowse>BROWSE</NavBrowse>
            <NavProfile>
              <UserProfile>
                <i className="fa fa-user"></i>
              </UserProfile>
            </NavProfile>
          </Navlist>
        </Navbar>
        <Header>POPULAR</Header>
        <List key="list1">
        {
          this.state.movies.map((movie) => [
            <MediaWrap key={movie.id}>
              <Image key={movie.id+'image'} src={img_path+movie.backdrop_path}/>
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
              <Image key={trend.id+'image'} src={img_path+trend.backdrop_path}/>
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
              <Image key={tvShow.id+'image'} src={img_path+tvShow.backdrop_path}/>
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
