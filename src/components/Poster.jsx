import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";

const imagePath = "https://image.tmdb.org/t/p/w780";

const ImageWrap = styled.div`
 width: 40%;
  margin-right: ${props => props.theme.sizes.large};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 1.78}px;
  transition: 0.2s ease-in-out;
  ${props => props.renderPortrait && css`
    width: ${props => props.width / 2}px;
    height: calc(${props => props.width / 2 * 1.5}px);
  `}

  :hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
`;

export default class Poster extends React.Component {
    state = {
        width: 0
    }
    poster = React.createRef();



    componentDidMount(){
        this.setState({width: this.poster.current.clientWidth})
    }
    render(){
        const {result} = this.props;
        return  (
        <ImageWrap ref={this.poster}   >
              <Link
                to={
                  result.title
                    ? "movie/" + result.id
                    : result.original_name
                    ? "tv/" + result.id
                    : "person/" + result.id
                }
              >
                <Image
                renderPortrait={!result.backdrop_path && result.poster_path}
                  width={this.state.width}
                  src={
                    result.backdrop_path
                      ? imagePath + result.backdrop_path
                      : result.poster_path
                      ? imagePath + result.poster_path
                      : result.profile_path
                      ? imagePath + result.profile_path
                      : `https://via.placeholder.com/500x281/212025/FFFFFF?text=${result.title ||
                          result.name}`
                  }
                  alt={`${result.title || result.name} backdrop`}
                />
              </Link>
            </ImageWrap>
            )
    }
}
