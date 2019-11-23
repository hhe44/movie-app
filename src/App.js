import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingProvider from "./loadingContext";
import Navbar from "./components/Navbar";
import MediaList from "./components/MediaList";
import MediaPage from "./pages/MediaPage";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import ActorPage from "./pages/ActorPage"
import './App.css'

const Content = styled.div`
  background: ${props => props.theme.colors.mainBG};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.sizes.navHeight};
`;

const fullWidth = {
  width: '100vw'
}

const Landing = () => (
  <>
    <MediaList title={"POPULAR"} mediaType={"discover/movie"} />
    <MediaList title={"TRENDING"} mediaType={"trending/all/day"} />
    <MediaList title={"TV SHOWS"} mediaType={"tv/popular"} />
  </>
);

class App extends React.Component {
  render() {
    return (
      <Content>
        <LoadingProvider style={fullWidth}>
          <Router>
            <Navbar />
            <div style={fullWidth} >
              <Route path="/" exact component={Landing} />
              <Route path="/browse" exact component={BrowsePage} />
              <Route path="/movie/:id" exact component={MediaPage} />
              <Route path="/tv/:id" exact component={MediaPage} />
              <Route path="/person/:id" exact component={ActorPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/mediahomepage" />
            </div>
          </Router>
        </LoadingProvider>
      </Content>
    );
  }
}

export default App;
