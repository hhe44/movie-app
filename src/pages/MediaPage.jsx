import React from "react";
import styled, {css} from "styled-components";
import axios from "axios";
import {rgba} from 'polished'
import { Link } from "react-router-dom";
import { Title, Overview } from "../components/Typography";

const MediaPageContainer = styled.div`
  width: 100vw;
  position: relative;
`
const Image = styled.div`
  width: 100vw;
  height: calc(100vh - ${props => props.theme.sizes.xxLarge});
  background: url(${props => props.src}) no-repeat center center; 
  background-size: cover;
   width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`


const MediaDetails = styled.div`
  width: 100%;
  height: calc(100vh - ${props => props.theme.sizes.xxLarge});
  top: 0;
  left: 0;
  position: relative;
   background:  linear-gradient(rgba(20, 20, 20, 0.3) 50%,rgba(20, 20, 20, 0.8) 90%, rgba(20, 20, 20, 1));
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding-left: 15%;
   padding-right: 15%;
   box-sizing: border-box;
  
`
const StyledTitle = styled.h1`
  font-size: 80px;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-top: 0;
  margin-bottom: 64px;
`

const Tagline = styled.h3`
  font-size: ${props => props.theme.fonts.medium};
  font-weight: 300;
  margin-top: 128px;
  margin-bottom: ${props => props.theme.sizes.small};
  color: ${props => rgba( props.theme.colors.white, 0.8)};
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 24px;
  color: black;
  background: #E8E8E8;
  font-weight: 800;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border: 1px solid #E8E8E8;
  cursor: pointer;
  ${props => props.alt && css`
    color: #E8E8E8;
    background: ${ rgba(props.theme.colors.mainBG, 0.1)};
  `}
`

export default class MediaPage extends React.PureComponent {
  state = {
    media: {}
  };

  async componentDidMount() {
    const param = this.props.match.url.split("/");

    //update to query-string
    const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${param[2]}?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(getMediaDetail);
    this.setState({ media: response.data });
    console.log(this.state);
  }

  render() {
    const { media } = this.state;
    const imagePath = "https://image.tmdb.org/t/p/original";
    return (
      <MediaPageContainer>
        <Image src={imagePath + media.backdrop_path} />
        <MediaDetails>
          
           <div style={{position: 'absolute', zIndex:  999, height: '50%'}} >
            <Tagline>{media.tagline}</Tagline>
            <StyledTitle>{media.title || media.name}</StyledTitle>
            <Buttons>
              <Button >{media.release_date || media.last_air_date ? "TRAILER" : "VISIT PROFILE"}</Button>
              <Button alt as='a' href={media.homepage} target='_blank'>{media.release_date || media.last_air_date ? "HOMEPAGE" : "MORE DETAILS"}</Button>
            </Buttons>
          </div>
        </MediaDetails>
        <div>
           <Overview>{media.overview || media.biography}</Overview>
        </div>
      </MediaPageContainer>
    );
  }
}
