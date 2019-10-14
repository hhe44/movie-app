import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import logo from "../images/netflixlogo.png";
import { Link } from "react-router-dom";

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
const NavItems = styled.div`
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
  cursor: pointer;
`;
const NavSearch = styled.div`
  margin-left: 128px;
  margin-right: 64px;
  display: flex;
`;
const SearchBar = styled.form`
`
const SearchButton = styled.button`
  border: none;
  outline: none;
  font-size: 1em;
  margin-right: 4px;
  background-color: #212025;
  color: #92908e;
  cursor: pointer;
`
const SearchText = styled.input`
  border: none;
  outline: none;
  height: 20px;
  position: relative;
  bottom: 2px;
  font-family: Arial;
  font-weight: 700;
  background-color: #D6D6D7;
  text-indent: 10px;
  border-radius: 10px;
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
  top: 10px;
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
