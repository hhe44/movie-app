import React from "react";
import styled from "styled-components";
import CastMember from "./CastMember";

const ActorContainer = styled.div`
  width: 100%;
  @media (max-width: 600px) {
    height: calc(100vh - ${(props) => props.theme.sizes.navHeightMobile});
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
`;

const ActorContainerTitle = styled.h2`
  font-family: Open Sans;
  font-size: ${(props) => props.theme.fonts.xLarge};
  color: ${(props) => props.theme.colors.white};
  padding-top: ${(props) => props.theme.sizes.medium};
  padding-bottom: ${(props) => props.theme.sizes.medium};
  text-align: center;
`;

const CastList = ({ actorInfo }) => {
  const topTenCast = actorInfo.cast.filter((castMember, index) => index < 8);
  return (
    <div>
      <ActorContainerTitle>Cast List</ActorContainerTitle>
      <ActorContainer>
        {topTenCast.map((actor) => (
          <CastMember key={actor.name} data={actor} />
        ))}
      </ActorContainer>
    </div>
  );
};

export default CastList;
