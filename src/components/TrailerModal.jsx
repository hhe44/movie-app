import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styled, { css } from "styled-components";
import { rgba, rem } from "polished";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(20, 20, 20, 0.7)"
  },
  content: {
    top: "53%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    background: "rgba(0, 0, 255, 0)",
    border: "none",
    display: "flex",
    flexDirection: "column"
  }
};

const MediaPageButton = styled.button`
  font-size: ${rem(24)};
  color: black;
  background: #e8e8e8;
  font-weight: 800;
  padding: ${rem(8)} ${rem(16)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${rem(16)};
  border: 1px solid #e8e8e8;
  cursor: pointer;
  ${props =>
    props.alt &&
    css`
      color: #e8e8e8;
      background: ${rgba(props.theme.colors.mainBG, 0.1)};
    `}
`;

const ModalCloseButton = styled.button`
  align-self: flex-end;
  width: ${rem(72)};
  font-family: Open Sans;
  font-size: ${rem(16)};
  font-weight: 800;
  border: none;
  color: white;
  background: rgba(0, 0, 255, 0);
`;

const TrailerModal = props => {

  const [state, setState] = useState({showModal: false});

  const handleOpenModal = () => {
    setState({ showModal: true });
  }

  const handleCloseModal = () => {
    setState({ showModal: false });
  }

    console.log(props);
    return (
      <div>
        <MediaPageButton onClick={handleOpenModal}>
          TRAILER
        </MediaPageButton>
        <ReactModal isOpen={state.showModal} style={customStyles}>
          <ModalCloseButton onClick={handleCloseModal}>
            EXIT
          </ModalCloseButton>
          <iframe
            title={props.title}
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/" + props.trailerKey}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; 
            gyroscope; picture-in-picture"
            allowFullScreen
          />
        </ReactModal>
      </div>
    );
  }

  export default TrailerModal;