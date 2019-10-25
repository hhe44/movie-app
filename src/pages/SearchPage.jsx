import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import { rem } from "polished";
import { Button } from "../components/Button";
import { SearchPageContainer } from "../components/Container";
import {
  SearchResultTitle,
  SearchPageBlurb,
  MediaDetail,
  Overview
} from "../components/Typography";
import SearchResult from "../components/SearchResult";

const SearchParams = styled.div`
  padding: ${props => props.theme.sizes.large} 0
    ${props => props.theme.sizes.small} 0;
  display: flex;
  justify-content: space-around;
`;

const MediaSelection = styled.select`
  width: ${rem(160)};
  padding: ${rem(8)};
  font-size: ${props => props.theme.fonts.small};
  border: 0;
  border-radius: 0;
  height: ${props => props.theme.sizes.Large};
  -webkit-appearance: none;
`;

const ButtonRowOne = styled.div``;

const ResultWrap = styled.div`
  border-bottom: solid 1px ${props => props.theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.sizes.small} 0;
`;

const ButtonRowTwo = styled.div`
  padding: ${props => props.theme.sizes.large} 0;
  display: flex;
  justify-content: center;
`;

class SearchPage extends React.Component {
  state = {
    results: []
  };

  getResults = async () => {
    const query = queryString.parse(this.props.location.search);
    const link = `https://api.themoviedb.org/3/search/${query.searchMedia}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${query.page}&include_adult=false&query=${query.searchTerm}`;
    const response = await axios.get(link);
    this.setState({
      results: response.data.results,
      totalPages: response.data.total_pages
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.getResults();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getResults();
    }
  }

  handleNextPage = () => {
    const query = queryString.parse(this.props.location.search);
    const page = parseInt(query.page);
    const { totalPages } = this.state;
    if (page + 1 > totalPages) return;
    query.page = page + 1;
    const stringified = queryString.stringify(query);
    this.props.history.push(`?${stringified}`);
  };

  handleBackPage = () => {
    const query = queryString.parse(this.props.location.search);
    const page = parseInt(query.page);
    if (page === 1) return;
    query.page = page - 1;
    const stringified = queryString.stringify(query);
    this.props.history.push(`?${stringified}`);
  };

  handleSelection = e => {
    const searchMedia = e.target.value;
    const query = queryString.parse(this.props.location.search);
    query.searchMedia = searchMedia;
    query.page = 1;
    const stringified = queryString.stringify(query);
    this.props.history.push(`?${stringified}`);
  };

  render() {
    const { results } = this.state;
    return (
      <SearchPageContainer>
        <SearchParams>
          <MediaSelection
            value={this.state.searchMedia}
            onChange={this.handleSelection}
          >
            <option defaultValue value="multi">
              ALL
            </option>
            <option value="movie">MOVIES</option>
            <option value="person">PEOPLE</option>
            <option value="tv">TV SHOWS</option>
          </MediaSelection>
          <ButtonRowOne>
            <Button onClick={this.handleBackPage} label={"BACK"} />
            <Button
              onClick={this.handleNextPage}
              label={
                this.state.page === this.state.totalPages
                  ? "NO MORE PAGES"
                  : "FORWARD"
              }
            />
          </ButtonRowOne>
        </SearchParams>
        {results.map(result => [
          <ResultWrap key={result.id}>
            <SearchResult result={result} />
            <SearchPageBlurb>
              <SearchResultTitle>
                {result.title || result.name}
              </SearchResultTitle>
              <MediaDetail>
                {
                  result.release_date ? "Release Date: " + result.release_date 
                  : result.last_air_date ? "Last Aired: " + result.last_air_date
                  : ""
                }
              </MediaDetail>
              <MediaDetail>
                {result.vote_average
                  ? `Rating: ${result.vote_average} / 10`
                  : ""}
              </MediaDetail>
              <Overview>{result.overview}</Overview>
            </SearchPageBlurb>
          </ResultWrap>
        ])}
        <ButtonRowTwo>
          <Button onClick={this.handleBackPage} label={"BACK"} />
          <Button
            onClick={this.handleNextPage}
            label={
              this.state.page === this.state.totalPages
                ? "NO MORE PAGES"
                : "FORWARD"
            }
          />
        </ButtonRowTwo>
      </SearchPageContainer>
    );
  }
}

export default withRouter(SearchPage);
