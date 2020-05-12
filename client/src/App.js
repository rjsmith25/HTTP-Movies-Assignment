import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import MovieUpdate from "./Movies/MovieUpdate";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    return axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      });
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList().then(data => {
      setMovieList(data);
    });
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          setMovieList={setMovieList}
          getMovieList={getMovieList}
        />
      </Route>

      <Route path="/update-movie/:id">
        <MovieUpdate setMovieList={setMovieList} getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
