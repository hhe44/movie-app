import React from "react";
import styled from "styled-components";
import axios from "axios";
import queryString from "query-string";
import { rem } from "polished";
import { Button } from "../../components/Button";
import { SearchPageContainer } from "../../components/Container";
import {
  SearchResultTitle,
  SearchPageBlurb,
  MediaDetail,
  Overview
} from "../../components/Typography";
import SearchResult from "../../components/SearchResult";
import { LoadingConsumer } from "../../loadingContext";

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
  transition: 0.2s ease-in-out;
  @media (max-width: 600px) {
    padding: ${rem(4)};
    width: ${rem(100)};
    margin-right: ${rem(12)};
  }
`;

const ButtonRowOne = styled.div``;

const ResultWrap = styled.div`
  border-bottom: solid 1px ${props => props.theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.sizes.small} 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ButtonRowTwo = styled.div`
  padding: ${props => props.theme.sizes.large} 0;
  display: flex;
  justify-content: center;
`;

const options = [
  {defaultValue: true, value: 'multi', label: 'ALL'},
  { value: 'movie', label: 'MOVIES'},
  { value: 'person', label: 'ACTORS'},
  { value: 'tv', label: 'TV SERIES'}
]

export class SearchPage extends React.Component {
  state = {
    results: [],
    currentPage: 1
  };

  getResults = async () => {
    try {
      this.props.setLoading(true);
      const query = queryString.parse(this.props.location.search);
      const link = `https://api.themoviedb.org/3/search/${query.searchMedia}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${query.page}&include_adult=false&query=${query.searchTerm}`;
      let response = await axios.get(link);
      if(parseInt(response.data.total_pages) < parseInt(query.page)){
        return this.props.history.push(`/search?page=${response.data.total_pages}&searchMedia=${query.searchMedia}&searchTerm=${query.searchTerm}`);
      }
      this.setState({
        results: response.data.results,
        totalPages: response.data.total_pages
      });
      this.props.setLoading(false);
    } catch(err) {
      console.log(err.message);
      this.setState({ error: true });
      this.props.setLoading(false);
    }
  };

  componentDidMount() {
    this.getResults();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getResults();
      const query = queryString.parse(this.props.location.search);
      this.setState({currentPage: parseInt(query.page)});
    }
  }

  handlePageChange = (bool) => {
    const query = queryString.parse(this.props.location.search);
    const page = parseInt(query.page);
    const { totalPages } = this.state;
    if(bool){
      if (page + 1 > totalPages) return;
      query.page = page + 1;
    } else {
      if (page === 1) return;
      query.page = page - 1;
    }
    this.setState({currentPage: query.page});
    const stringified = queryString.stringify(query);
    this.props.history.push(`?${stringified}`);
  }

  handleSelection = e => {
    const searchMedia = e.target.value;
    const query = queryString.parse(this.props.location.search);
    query.searchMedia = searchMedia;
    query.page = 1;
    const stringified = queryString.stringify(query);
    this.props.history.push(`?${stringified}`);
  };

  render() {
    const { results,currentPage, totalPages } = this.state;
    const hasResults = results.length;
    const showForwardBtn = !(currentPage === totalPages) && hasResults;
    return (
      <SearchPageContainer>
        <SearchParams>
          {hasResults && (
            <MediaSelection value={this.state.searchMedia} onChange={this.handleSelection}>
              {options.map(option => (
                <option defaultValue={option.defaultValue} key={option.value} value={option.value}>
                  {option.label}
                </option> 
              ))}
            </MediaSelection>
          )}
          <ButtonRowOne>
            {(this.state.currentPage > 1)  && (
              <Button
                onClick={() => this.handlePageChange(false)}
                label={"BACK"}
              />
            )}
            {showForwardBtn && (
              <Button
                onClick={() => this.handlePageChange(true)}
                label={"FORWARD"}
              />
            )}
          </ButtonRowOne>
        </SearchParams>
        {results.map(result => (
          <ResultWrap key={result.id}>
            <SearchResult result={result} />
            <SearchPageBlurb>
              <SearchResultTitle>
                {result.title || result.name}
              </SearchResultTitle>
              <MediaDetail>
                {result.release_date
                  ? "Release Date: " + result.release_date
                  : result.last_air_date
                  ? "Last Aired: " + result.last_air_date
                  : ""}
              </MediaDetail>
              <MediaDetail>
                {result.vote_average
                  ? `Rating: ${result.vote_average} / 10`
                  : ""}
              </MediaDetail>
              <Overview>{result.overview}</Overview>
            </SearchPageBlurb>
          </ResultWrap>
        ))}
        <ButtonRowTwo>
          {(this.state.currentPage > 1) && (
            <Button
              onClick={() => this.handlePageChange(false)}
              label={"BACK"}
            />
          )}
          {showForwardBtn && (
            <Button
              onClick={() => this.handlePageChange(true)}
              label={"FORWARD"}
            />
          )}
        </ButtonRowTwo>
        {!this.props.loading && !hasResults && (
          <SearchResultTitle>NO RESULTS FOUND!</SearchResultTitle>
        )}
      </SearchPageContainer>
    );
  }
}

const WithConsumer = (props) => (
  <LoadingConsumer>
    {(values) => <SearchPage {...values} {...props} />}
  </LoadingConsumer>
);

export default WithConsumer;