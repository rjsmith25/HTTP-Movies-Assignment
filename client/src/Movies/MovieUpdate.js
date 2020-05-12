import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieUpdate(props) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${params.id}`).then(res => {
      setMovie(res.data);
    });
  }, [params.id]);

  function onChangeEvent(e) {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!movie.title && !movie.director && !movie.metascore && !movie.stars) {
      return;
    }

    let movieStars = movie.stars;

    // convert back to array split by comma
    if (!Array.isArray(movieStars)) {
      movieStars = movieStars.split(",");
    }

    console.log(movieStars);

    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, {
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: movieStars
      })
      .then(res => {
        return props.getMovieList();
      })
      .then(data => {
        props.setMovieList(data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  return (
    <form onSubmit={onSubmit} className="Movie-Update">
      <input
        onChange={onChangeEvent}
        value={movie.title}
        name="title"
        type="text"
      />
      <input
        onChange={onChangeEvent}
        value={movie.director}
        name="director"
        type="text"
      />
      <input
        onChange={onChangeEvent}
        value={movie.metascore}
        name="metascore"
        type="number"
      />
      <input
        onChange={onChangeEvent}
        value={movie.stars}
        name="stars"
        type="text"
      />
      <button>Update Movie</button>
    </form>
  );
}

export default MovieUpdate;
