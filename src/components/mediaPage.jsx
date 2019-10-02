import React from "react";

const movieDetail = "https://api.themoviedb.org/3/movie/343611?api_key={api_key}";

export default class MediaPage extends React.PureComponent {

  // print = ({match}) => {
  //   console.log(match);
  // }

  print = () => { console.log(this.props) }

  render() {
    return (
      <div>
        {this.print()}
        <h1>I AM RENDEEEERED</h1>
      </div>
    );
  }
}
