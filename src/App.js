import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import MediaList from './components/MediaList';



const Content = styled.div`
  background: #212025;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 128px;
`;


const Landing = () => (
  <>
    <MediaList
      title={'Popular'}
      mediaType={'discover/movie'}
    />
    <MediaList
      title={'Trending'}
      mediaType={'trending/all/day'}
    />
    <MediaList
      title={'TV SHOWS'}
      mediaType={'tv/popular'}
    />
  </>
)

class App extends React.Component {
  
  render () {
    return (
      <Content>
        <Navbar />
        <Router>
          <Switch>

            <Route path='/' component={Landing} />
          </Switch>

        </Router>
      </Content>
    )
  }
}

export default App;
