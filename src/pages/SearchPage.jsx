import React from 'react';
import axios from 'axios';

export default class SearchPage extends React.Component {
    state = {
        movies: []
    }

    getMovies = async (page=1) => {
        const query = this.props.location.search.split('=')[1];
        const link = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`;
        const response = await axios.get(link);
        this.setState({
            movies: response.data.results, 
            page: response.data.page, 
            totalPages: response.data.total_pages
        })
        console.log(response)
    }
     componentDidMount(){
       this.getMovies()
    }

    handleNextPage = () => {
        const { page, totalPages } = this.state;
        if(page+1 > totalPages) return;
        this.getMovies(page + 1)
    }
    render(){

        return (
            <div style={{color: 'white'}} >
                <button onClick={this.handleNextPage} >
                    {this.state.page === this.state.totalPages ? 'No more movies to load' : 'Load more'}
                </button>
            </div>
        )
    }
}