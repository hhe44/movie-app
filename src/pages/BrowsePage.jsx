import React from "react";
import MediaList from "../components/MediaList";

const BrowsePage = () => {
    return (
    <>
        <MediaList title={"ACTION"} mediaType={"discover/movie"} genreId={"28"}/>
        <MediaList title={"COMEDY"} mediaType={"discover/movie"} genreId={"35"}/>
        <MediaList title={"DRAMA"} mediaType={"discover/movie"} genreId={"18"}/>
        <MediaList title={"HORROR"} mediaType={"discover/movie"} genreId={"27"}/>
        <MediaList title={"ROMANCE"} mediaType={"discover/movie"} genreId={"10749"}/>
    </>
    )
}

export default BrowsePage;