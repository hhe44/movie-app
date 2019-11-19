import React, { Component } from 'react';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css'

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
                <LoadingContext.Provider value={{ setLoading: this.setLoading, loading: this.state.loading }}>
                    {this.props.children}
                </LoadingContext.Provider>
                {this.state.loading && <div style={{background: 'black', color: 'white', position : 'fixed', top: '6rem', left: 0, width: '100vw', height: 'calc(100vh - 6rem)'}} >
Loading....
                </div>}
            </div>
        )
    }
}
export default LoadingProvider;