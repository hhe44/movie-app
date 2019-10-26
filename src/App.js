import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MediaList from "./components/MediaList";
import MediaPage from "./pages/MediaPage";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";

const Content = styled.div`
  background: ${props => props.theme.colors.mainBG};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.sizes.xxLarge};
`;

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
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/browse" exact component={BrowsePage} />
            <Route path="/movie/:id" exact component={MediaPage} />
            <Route path="/tv/:id" exact component={MediaPage} />
            <Route path="/person/:id" exact component={MediaPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/mediahomepage" component={() => window.location = this.props.homepageurl} />
          </Switch>
        </Router>
      </Content>
    );
  }
}

export default App;
