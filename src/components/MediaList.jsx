import React from "react";
import styled from "styled-components";
import axios from "axios";
import VisibilitySensor from "react-visibility-sensor";

const Container = styled.div`
  max-width: 1400px;
  width: 100vw;
  padding: 0 64px;
  box-sizing: border-box;
`;

const List = styled.div`
  background: #212025;
  padding-bottom: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Header = styled.h1`
  font-family: Arial;
  font-size: ${props => (props.small ? "3rem" : "5em")};
  font-weight: 1000;
  align-self: flex-start;
  position: relative;
  padding-top: 32px;
  padding-bottom: 16px;
  letter-spacing: -2.5px;
  background: -webkit-linear-gradient(#fd001d, #fc014f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Caption = styled.h2`
  color: white;
  opacity: 0;
  transition: 0.2s;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 32px;
  transition: 0.2s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
  transition: 0.2s ease-in-out;
  :hover {
    opacity: 0.3;
  }
`;

const MediaWrap = styled.div`
  width: 25%;
  margin-bottom: -3px;
  position: relative;
  overflow: hidden;
  &:hover ${Image} {
    transform: scale(1.2);
  }
  &:hover ${Caption} {
    opacity: 1;
    transform: translatey(-16px);
  }
`;

const img_path = "https://image.tmdb.org/t/p/w500/";
const baseURL = "https://api.themoviedb.org/3";

export default class MediaList extends React.PureComponent {
  state = {
    medias: [],
    loading: false,
    isVisible: true
  };

  fetchMedias = async () => {
    this.setState({ loading: true });
    const api_medias = `${baseURL}/${this.props.mediaType}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const response = await axios.get(api_medias);
    this.setState({
        medias: response.data.results,
      loading: false
    });
  };

  handleVisibility = isVisible => {
    this.setState({
      isVisible
    });
    if (!this.state.medias.length) this.fetchMedias();
  };

  render() {
    const { title } = this.props;
    const { medias } = this.state;
    return (
      <VisibilitySensor onChange={this.handleVisibility}>
        <Container>
          <Header>{title}</Header>
          {this.state.loading && <Header small>Loading</Header>}
          <div>
            <List key="list1">
              {medias.map(media => [
                <MediaWrap key={media.id}>
                  <Image
                    key={media.id + "image"}
                    src={img_path + media.backdrop_path}
                    alt={`${media.title} backdrop`}
                  />
                  <Caption key={media.id + "cap"}>{media.title}</Caption>
                </MediaWrap>
              ])}
            </List>
          </div>
        </Container>
      </VisibilitySensor>
    );
  }
}
