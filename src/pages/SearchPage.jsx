import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1400px;
  width: 100vw;
  padding: 0 64px;
  box-sizing: border-box;
`;
const ResultWrap = styled.div`
  height: 360px;
  border-bottom: solid 1px #92908e;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageWrap = styled.div`
  width: 30vw;
  max-width: 500px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: auto;
  transition: 0.2s ease-in-out;
  :hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
  max-height: 281px;
`;
const Blurb = styled.div`
  width: 40vw;
  font-family: Helvetica;
  font-weight: 700;
  color: white;
  position: relative;
`;
const Title = styled.h1`
  text-transform: uppercase;
  font-family: Arial;
  font-size: 2em;
  font-weight: 1000;
  letter-spacing: -2.5px;
  background: -webkit-linear-gradient(#fd001d, #fc014f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;
const MediaDate = styled.h3`
  font-size: 1em;
  padding: 12px 0px 12px 0px;
  margin: 0;
`;
const Rating = styled.h3`
  font-size: 1em;
  padding: 0px 0px 12px 0px;
  margin: 0;
`;
const Overview = styled.p`
  font-size: 0.9  em;
`;

const imagePath = "https://image.tmdb.org/t/p/w500";

class SearchPage extends React.Component {
  state = {
    results: [],
    searchMedia: "multi"
  };

  getMovies = async (page = 1) => {
    const query = this.props.location.search.split("=")[1];
    const link = `https://api.themoviedb.org/3/search/${this.state.searchMedia}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`;
    const response = await axios.get(link);
    this.setState({
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages
    });
    // console.log(response);
  };

  componentDidMount() {
    this.getMovies();
  }

  handleNextPage = () => {
    const { page, totalPages } = this.state;
    if (page + 1 > totalPages) return;
    this.getMovies(page + 1);
  };

  handleSelection = (e) => {
    this.setState({searchMedia: e.target.value});
    console.log(this.props.history);
    this.getMovies();
    // this.props.history.push(`/filter?mediatype=${this.state.searchMedia}`);
  }

  render() {
    const { results } = this.state;
    return (
      <Container>
        {results.map(result => [
          <ResultWrap key={result.id}>
            <Link to={`/${result.title !== undefined ? "movie" : "tv"}/${result.id}`}>
            <ImageWrap key={result.id + "ImageWrap"}>
              <Image
                key={result.id + "Image"}
                src={
                  result.backdrop_path
                    ? imagePath + result.backdrop_path
                    : imagePath + result.poster_path
                }
                alt={`${result.title || result.name} backdrop`}
              />
            </ImageWrap>
            </Link>
            <Blurb>
              <Title>{result.title || result.name}</Title>
              <MediaDate>
                {result.release_date
                  ? "Release Date: " + result.release_date
                  : "Last Aired: " + result.last_air_date}
              </MediaDate>
              <Rating>Rating: {result.vote_average} / 10</Rating>
              <Overview>{result.overview}</Overview>
            </Blurb>
          </ResultWrap>
        ])}
        <select value={this.state.searchMedia} onChange={this.handleSelection}>
          <option defaultValue value="multi">ALL</option>
          <option value="movie">MOVIES</option>
          <option value="person">PEOPLE</option>
          <option value="tv">TV SHOWS</option>
       </select>
        <div style={{ color: "white" }}>
          <button onClick={this.handleNextPage}>
            {this.state.page === this.state.totalPages
              ? "No more movies to load"
              : "Load more"}
          </button>
        </div>
      </Container>
    );
  }
}

export default withRouter(SearchPage);
