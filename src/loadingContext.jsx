import React, { Component } from 'react';
import Loading from 'react-loading-bar';

const LoadingContext = React.createContext();
export const LoadingConsumer = LoadingContext.Consumer;

class LoadingProvider extends Component {
    state = {
        loading: false
    };

    setLoading = (loading) => {
        this.setState({ loading });
    };

    render(){
        return(
            <div>
                <Loading show={this.state.loading} color="red" showSpinner={true} />
                <LoadingContext.Provider value={{ setLoading: this.setLoading }}>
                    {this.props.children}
                </LoadingContext.Provider>
            </div>
        )
    }
}
export default LoadingProvider;