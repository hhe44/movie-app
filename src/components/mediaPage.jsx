import React from "react";
import axios from "axios";

const movieDetail = "https://api.themoviedb.org/3/movie/343611?api_key={api_key}";

export default class MediaPage extends React.PureComponent {
  state = {
    media: []
  };

  fetchMedia = async () => {
    const getMediaDetail = `https://api.themoviedb.org/3/movie/343611?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(getMediaDetail);
    this.setState({ media: response.data.results });
    console.log(this.state.media)
  };

  // Little debugger function here for help...!
  print = () => { console.log(this.state); console.log(this.props.match.url); }

  render() {
    return (
      <div>
        {this.print()}
        <h1>I AM RENDEEEERED</h1>
      </div>
    );
  }
}
