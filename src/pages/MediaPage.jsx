import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { rgba } from "polished";
import { MediaPageButton } from "../components/Button";
import TrailerModal from "../components/TrailerModal";

const MediaPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - ${props => props.theme.sizes.xxLarge});
  @media (max-width: 600px) {
    height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  }
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  top: 0;
  left: 0;
  @media (max-width: 600px) {
    top: 1rem;
    height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  }
`;

const FilterEffect = styled.div`
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
  @media (max-width: 600px) {
    top: 1rem;
    height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  }
`;

const MediaDetails = styled.div`
  font-family: Open Sans;
  position: relative;
  top: ${props => props.theme.sizes.xxLarge};
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
  font-size: ${props => props.theme.fonts.xxLarge};
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-top: 0;
  margin-bottom: ${props => props.theme.sizes.large};
  @media (max-width: 900px) {
    font-size: ${props => props.theme.fonts.xLarge};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: none;
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledHyperlink = styled.a`
  text-decoration: none;
`;

const OverviewDiv = styled.div`
  background: rgba(20, 20, 20);
  padding-top: ${props => props.theme.sizes.xLarge};
  padding-bottom: ${props => props.theme.sizes.xLarge};
  padding-left: 15%;
  padding-right: 15%;
  box-sizing: border-box;
`;

const Overview = styled.h3`
  font-family: Open Sans;
  font-size: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;

const MediaPage = (props) => {
  const [state, setState] = useState({ media: [] });

  useEffect(() => {
    const fetchData = async () => {
      const param = props.location.pathname;
      const getMediaDetail = `https://api.themoviedb.org/3${param}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;
      const response = await axios.get(getMediaDetail);
      setState({ media: response.data });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { media } = state;
  if (!media.videos) return <div>...loading</div>;
  const trailerKey = media.videos.results;
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <MediaPageContainer>
      <Image src={imagePath + media.backdrop_path} />
      <FilterEffect>
        <MediaDetails>
          <Tagline>{media.tagline}</Tagline>
          <StyledTitle>{media.title}</StyledTitle>
          <Buttons>
            {trailerKey.length > 0 && (
              <TrailerModal
                title={media.title}
                trailerKey={trailerKey[0].key}
              ></TrailerModal>
            )}
            {media.homepage && (
              <StyledHyperlink href={media.homepage} target="_blank">
                <MediaPageButton alt="true">{"HOMEPAGE"}</MediaPageButton>
              </StyledHyperlink>
            )}
          </Buttons>
        </MediaDetails>
      </FilterEffect>
      <OverviewDiv>
        <Overview>{media.overview}</Overview>
      </OverviewDiv>
    </MediaPageContainer>
  );
};

export default withRouter(MediaPage);
