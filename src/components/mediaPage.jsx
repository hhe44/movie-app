import React from "react";
import axios from "axios";

const movieDetail = "https://api.themoviedb.org/3/movie/343611?api_key={api_key}";

export default class MediaPage extends React.PureComponent {
  state = {
    media: []
  };

  
  async componentDidMount(){
    const param = this.props.match.url.split('/');
    const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${param[2]}?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(getMediaDetail);
    this.setState({media: response.data});
    console.log(response);
  }
  
  // fetchMedia = async () => {
  //   const param = this.props.match.url.split('/');
  //   const getMediaDetail = `https://api.themoviedb.org/3/${param[1]}/${param[2]}?api_key=${process.env.REACT_APP_API_KEY}`;
  //   const response = await axios.get(getMediaDetail);
  //   this.setState({ media: response.data });
  //   console.log(this.state);
  // };

  // Little debugger function here for help...!
  print = () => { console.log(this.state); console.log(this.props.match.url); }

  render() {
    return (
      <div> 
        <h1>I AM RENDEEEERED</h1>
      </div>
    );
  }
}
