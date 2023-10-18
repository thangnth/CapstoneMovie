import React from "react";
import { useParams } from "react-router-dom";
import MovieProfile from "./MovieProfile";
import ShowTimes from "./ShowTimes";

export default function Details() {
  const { movieId } = useParams();

  return (
    <div>
      <MovieProfile movieId={movieId} />
      <ShowTimes movieId={movieId} />
    </div>
  );
}
