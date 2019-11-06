import React from "react";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import { rgba } from "polished";

const MediaPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - ${props => props.theme.sizes.xxLarge});
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  top: 0;
  left: 0;
`;

const MediaDetails = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - ${props => props.theme.sizes.xxLarge});
  top: 0;
  left: 0;
  background: linear-gradient(
    rgba(20, 20, 20, 0.3) 50%,
    rgba(20, 20, 20, 0.8) 90%,
    rgba(20, 20, 20, 1)
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 15%;
  padding-right: 15%;
  box-sizing: border-box;
`;

const Tagline = styled.h3`
  font-size: ${props => props.theme.fonts.medium};
  font-weight: 300;
  margin-top: ${props => props.theme.sizes.xLarge};
  margin-bottom: ${props => props.theme.sizes.small};
  color: ${props => rgba(props.theme.colors.white, 0.8)};
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: ${props => props.theme.fonts.xxLarge};;
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-top: 0;
  margin-bottom: ${props => props.theme.sizes.large};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const Button = styled.button`
  font-size: ${props => props.theme.fonts.medium};
  color: black;
  background: #e8e8e8;
  font-weight: 800;
  padding: ${props => props.theme.sizes.tiny} ${props => props.theme.sizes.small};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => props.theme.sizes.small};
  border: 1px solid #e8e8e8;
  cursor: pointer;
  ${props =>  props.alt && css`
      color: #e8e8e8;
      background: ${rgba(props.theme.colors.mainBG, 0.1)};
    `}
`;

const StyledHyperlink = styled.a`
  text-decoration: none;
`

const OverviewDiv = styled.div`
  position: relative;
  background: rgba(20, 20, 20);
  width: 100vw;
  padding-top: ${props => props.theme.sizes.xLarge};
  padding-bottom: ${props => props.theme.sizes.xLarge};
  padding-left: 15%;
  padding-right: 15%;
  box-sizing: border-box;
`

const Overview = styled.h3`
  font-size: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`

class MediaPage extends React.PureComponent {
  state = {
    media: {}
  };

  async componentDidMount() {
    const param = this.props.location.pathname;
    const getMediaDetail = `https://api.themoviedb.org/3${param}?api_key=${process.env.REACT_APP_API_KEY}`;
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
            <Tagline>{media.tagline}</Tagline>
            <StyledTitle>{media.title || media.name}</StyledTitle>
            <Buttons>
              <Button>
                {media.release_date || media.last_air_date
                  ? "TRAILER"
                  : "VISIT PROFILE"}
              </Button>
              <StyledHyperlink href={media.homepage} target="_blank">
                <Button alt="true">
                  {media.release_date || media.last_air_date ? "HOMEPAGE" : "MORE DETAILS"}
                </Button>
              </StyledHyperlink>
            </Buttons>
        </MediaDetails>
        {/* For some reason, overview is giving me an overflow on the x-plane */}
        <OverviewDiv>
          <Overview>{media.overview || media.biography}</Overview>
        </OverviewDiv>
      </MediaPageContainer>
    );
  }
}

export default withRouter(MediaPage);