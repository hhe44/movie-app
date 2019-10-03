import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MediaList from "./components/MediaList";
import MediaPage from "./components/MediaPage"

const Content = styled.div`
  background: #212025;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 128px;
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
            <Route path="/"exact component={Landing} />
            <Route path="/movie/:id" exact component={MediaPage} />
            <Route path="/tvshow/:id" exact component={MediaPage} />
          </Switch>
        </Router>
      </Content>
    );
  }
}

export default App;