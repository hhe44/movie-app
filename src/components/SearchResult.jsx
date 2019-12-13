import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const imagePath = "https://image.tmdb.org/t/p/w780";

const ImageWrap = styled.div`
  width: 40%;
  margin-right: ${props => props.theme.sizes.large};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    width: 100%
  }
`;

const Image = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 1.78}px;
  transition: 0.2s ease-in-out;
  ${
    props => props.renderPortrait &&
    css`
      width: ${props => props.width / 2}px;
      height: calc(${props => (props.width / 2) * 1.5}px);
    `
  }
  :hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
`;

const SearchPageResult = (props) => {

  const [width, setWidth] = useState(0);
  const poster = React.createRef();

  useEffect(() => {
    setWidth(poster.current.clientWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { result } = props;
  return (
    <ImageWrap ref={poster}>
      <Link
        to={ result.title ? "movie/" + result.id
            : result.original_name ? "tv/" + result.id
            : "person/" + result.id
        }
      >
        <Image
          // Render portrait IF there is no backdrop AND there is a poster path OR if it is an actor
          renderPortrait={ (!result.backdrop_path && result.poster_path) || (result.gender)}
          width={width}
          // if there is a backdrop, use that
          // else if there is a poster, use a poster
          // else if there is a profile pic, use the profile pic
          // else if the media type is a movie or TV and there's neither a backdrop or poster, use a place holder
          // else we're stuck with an actor with no profile picture, use a different sized placeholder...
          src={
            result.backdrop_path ? imagePath + result.backdrop_path 
            : result.poster_path ? imagePath + result.poster_path 
            : result.profile_path ? imagePath + result.profile_path 
            : (result.media_type === "movie" || "tv") ? `https://via.placeholder.com/500x281/212025/FFFFFF?text=${result.title || result.name}`
            :`https://via.placeholder.com/270x480/212025/FFFFFF?text=${result.name}`
          }
          alt={`${result.title || result.name} backdrop`}
        />
      </Link>
    </ImageWrap>
  );
}

export default SearchPageResult;