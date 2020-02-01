import React from "react";
import styled from "styled-components";
import imagePlaceholder from "../images/actorPlaceholderImage.jpg";

const CastMemberContainer = styled.div`
  padding-top: ${(props) => props.theme.sizes.medium};
  padding-bottom: ${(props) => props.theme.sizes.xLarge};
  flex: 1 0 21%;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.src}) no-repeat center;
  background-size: cover;
  display: block;
  margin: 0 auto;
  align-items: center;
`;

const Img = styled.img`
  width: 200px;
  height: 280px;
`;

const ActorLabel = styled.div`
  font-family: Open Sans;
  padding-top: ${(props) => props.theme.sizes.small};
  font-size: ${(props) => props.theme.fonts.small};
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  margin: 0 auto;
`;

const CharacterLabel = styled.div`
  font-family: Open Sans;
  padding-top: ${(props) => props.theme.sizes.tiny};
  font-size: ${(props) => props.theme.fonts.small};
  color: ${(props) => props.theme.colors.white};
  margin: 0 auto;
`;

const CastMember = (props) => {
  const textForImage = `https://image.tmdb.org/t/p/w185${props.data.profile_path}`;
  return (
    <CastMemberContainer>
      <ImageContainer>
        <Img
          alt="Actor Image or placeholder when none provided"
          src={props.data.profile_path ? textForImage : imagePlaceholder}
        />
        <ActorLabel>{props.data.name}</ActorLabel>
        <CharacterLabel>{props.data.character}</CharacterLabel>
      </ImageContainer>
    </CastMemberContainer>
  );
};

export default CastMember;
