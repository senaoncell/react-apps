import { useEffect, useState } from "react";
// TMDB (The Movie Database) API key
// Your own API key should be added here
const api_key = " ";

export default function useMovieDetails(id) {
  const [movie, setMovie] = useState({}); // State that keeps film details
  const [loading, setLoading] = useState(false); // State that holds the loading status

  // Re-captures movie details when ID changes
  useEffect(
    function () {
      // Function that retrieves asynchronous film details
      async function getMovieDetails() {
        setLoading(true); // Loading has started
        // Film detayları için API isteği
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
        );
        // The incoming response is converted to JSON
        const data = await res.json();
        setMovie(data); // Film information is saved to the state.
        setLoading(false); // Upload complete
      }

      getMovieDetails(); // The function is called
    },
    [id]
  );
  // movie and loading values ​​are returned
  return { movie, loading };
}