import React, { useState } from "react";
import Loading from "react-loading-bar";
import "react-loading-bar/dist/index.css";

const LoadingContext = React.createContext();
export const LoadingConsumer = LoadingContext.Consumer;

const LoadingProvider = (props) => {

  const [state, setState] = useState({
    loading: false
  });

  const setLoading = (loading) => {
    setState({ loading });
  };

  return (
    <div style={props.style}>
      <Loading show={state.loading} color="red" showSpinner={true} />
      <LoadingContext.Provider value={{ setLoading: setLoading, loading: state.loading }}>
        {props.children}
      </LoadingContext.Provider>
      {state.loading && (
        <div
          style={{
            background: "black",
            color: "white",
            position: "fixed",
            top: "6rem",
            left: 0,
            width: "100vw",
            height: "calc(100vh - 6rem)"
          }}
        >
          Loading....
        </div>
      )}
    </div>
  );
}

export default LoadingProvider;