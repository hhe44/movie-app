import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { MediaListTitle, Caption } from "../components/Typography";
import { LoadingConsumer } from "../loadingContext";

const List = styled.div`
  background: ${props => props.theme.colors.mainBG};
  padding-bottom: ${props => props.theme.sizes.xLarge};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 100%;
  transition: 0.2s ease-in-out;
  :hover {
    opacity: 0.3;
  }
  cursor: pointer;
`;

const MediaWrap = styled.div`
  width: 25%;
  margin-bottom: -3px;
  position: relative;
  overflow: hidden;
  &:hover ${Image} {
    transform: scale(1.05);
  }
  &:hover ${Caption} {
    opacity: 1;
    transform: translatey(-${props => props.theme.sizes.small});
  }
  @media (max-width: 1200px) {
    width: 33%;
  }
  @media (max-width: 900px) {
    width: 50%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const imagePath = "https://image.tmdb.org/t/p/w780/";
const baseURL = "https://api.themoviedb.org/3";

class MediaList extends React.PureComponent {
  state = {
    medias: [],
    isVisible: false
  };

  fetchMedias = async () => {
    this.props.setLoading(true);
    const { genreId } = this.props;
    const getMediaList = `${baseURL}/${this.props.mediaType}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_adult=false&language=en-US&page=1${genreId ? "&with_genres="+genreId : ""}`;
    const response = await axios.get(getMediaList);
    this.setState({
      medias: response.data.results,
    });
    console.log(this.props);
    this.props.setLoading(false);
  };

  componentDidMount() {
    this.fetchMedias();
  }

  render() {
    const { title } = this.props;
    const { medias } = this.state;
    return (
        <Container>
          <MediaListTitle>{title}</MediaListTitle>
          <div>
            <List key="list1">
              {medias.map(media => [
                <MediaWrap key={media.id}>
                  <Link to={`/${media.title !== undefined ? "movie" : "tv"}/${media.id}`}>
                    <Image
                      key={media.id + "image"}
                      src={
                        media.backdrop_path !== null
                        ? imagePath + media.backdrop_path 
                        : `https://via.placeholder.com/500x281/212025/FFFFFF?text=${media.title || media.name}`
                      }
                      alt={`${media.title || media.name} backdrop`}
                    />
                  </Link>
                  <Caption key={media.id + "cap"}>
                    {media.title || media.name}
                  </Caption>
                </MediaWrap>
              ])}
            </List>
          </div>
        </Container>
    );
  }
}

export default (props) => (
  <LoadingConsumer>
    {(loading) => <MediaList {...loading} {...props} />}
  </LoadingConsumer>
);