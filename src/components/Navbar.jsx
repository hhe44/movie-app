import React from "react";
import styled from "styled-components";
import logo from "../images/netflixlogo.png";

const Navbar = styled.div`
  position: fixed;
  height: 128px;
  width: 100vw;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(33, 32, 37, 1) 60%, rgba(33, 32, 37, 0.9));
  box-shadow: 0px 5px 25px rgba(253, 0, 29, 0.1);
  z-index: 9;
`;
const Navlist = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  font-size: 1.3em;
  font-family: Nunito;
  color: #92908e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 64px;
  box-sizing: border-box;
`;
const NavLogo = styled.img`
  height: 60px;
  width: auto;
  margin-right: 128px;
`;
const NavSearch = styled.div`
  margin-right: 64px;
`;
const NavBrowse = styled.div``;
const NavProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  margin-left: auto;
`;

const UserProfile = styled.div`
  text-align: center;
  vertical-align: center;
  position: relative;
  top: 10px;
`;

export default () => (
  <Navbar>
    <Navlist>
      <NavLogo src={logo}></NavLogo>
      <NavSearch>
        <i className="fa fa-search"></i>
      </NavSearch>
      <NavBrowse>BROWSE</NavBrowse>
      <NavProfile>
        <UserProfile>
          <i className="fa fa-user"></i>
        </UserProfile>
      </NavProfile>
    </Navlist>
  </Navbar>
);