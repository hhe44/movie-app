import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import logo from "../images/netflixlogo.png";
import { Link } from "react-router-dom";

const Navbar = styled.div`
  position: fixed;
  height: ${props => props.theme.sizes.xxLarge};
  width: 100vw;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(20, 20, 20, 1) 60%, rgba(20, 20, 20, 0.8));
  box-shadow: 0px 4px 24px rgba(253, 0, 29, 0.1);
  z-index: 9;
`;
const NavItems = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  font-size: ${props => props.theme.fonts.medium};
  font-family: Nunito;
  color: ${props => props.theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
const NavLogo = styled.img`
  height: ${props => props.theme.sizes.xLarge};
  width: auto;
  cursor: pointer;
`;
const NavSearch = styled.div`
  margin-left: ${props => props.theme.sizes.xLarge};
  margin-right: ${props => props.theme.sizes.large};
  display: flex;
`;
const SearchBar = styled.form``
const SearchButton = styled.button`
  border: none;
  outline: none;
  font-size: ${props => props.theme.fonts.medium};
  margin-right: ${props => props.theme.sizes.tiny};
  background-color: ${props => props.theme.colors.mainBG};
  color: ${props => props.theme.colors.grey};
  cursor: pointer;
`
const SearchText = styled.input`
  border: none;
  outline: none;
  height: ${props => props.theme.sizes.medium};
  position: relative;
  bottom: 2px;
  font-family: Arial;
  font-weight: 700;
  background-color: ${props => props.theme.colors.white};
  text-indent: ${props => props.theme.sizes.small};
  border-radius: ${props => props.theme.sizes.small};
`
const NavBrowse = styled.div`
  cursor: pointer;
`;
const NavProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  margin-left: auto;
  cursor: pointer;
`;
const UserProfile = styled.div`
  text-align: center;
  vertical-align: center;
  position: relative;
  top: 8px;
  cursor: pointer;
`;

class Navigation extends React.Component {
  state = {
    searchTerm: ""
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = e => {
    // preventDefault to avoid reloading entire page, which would be its default behavior
    e.preventDefault();
    if(!this.state.searchTerm) return;
    this.props.history.push(`/search?page=1&searchMedia=multi&searchTerm=${this.state.searchTerm}`);
  };

  render() {
    return (
      <Navbar>
        <NavItems>
          <Link to="/">
            <NavLogo src={logo}></NavLogo>
          </Link>
          <NavSearch>
            <SearchBar onSubmit={this.handleSubmit}>
              <SearchButton type="submit"><i className="fa fa-search"></i></SearchButton>
              <SearchText value={this.state.searchTerm} onChange={this.handleChange}/>
            </SearchBar>
          </NavSearch>
          <NavBrowse>BROWSE</NavBrowse>
          <NavProfile>
            <UserProfile>
              <i className="fa fa-user"></i>
            </UserProfile>
          </NavProfile>
        </NavItems>
      </Navbar>
    );
  }
}

// withRouter gives us access to the history
export default withRouter(Navigation);
