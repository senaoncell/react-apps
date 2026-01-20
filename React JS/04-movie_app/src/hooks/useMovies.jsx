import { useEffect, useState } from "react";

// TMDB (The Movie Database) API key
// Your own API key should be added here
const api_key = " ";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]); // Keeps the list of movies that came up in the search results
  const [loading, setLoading] = useState(false); // Holds the data loading status
  const [error, setError] = useState(""); // Holds error messages
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [total_results, setTotalResults] = useState(0); // Total number of films found

  function nextPage() {
    setCurrentPage(currentPage + 1); // Go to the next page
  }

  function PreviousPage() {
    setCurrentPage(currentPage - 1); // Goes to the previous page
  }

  // This runs when the query or currentPage changes
  useEffect(
    function () {
      // AbortController for request cancellation
      const controller = new AbortController();
      const signal = controller.signal;

      // Asynchronous function that makes the movie search request
      async function getMovies(page) {
        try {
          setLoading(true); // Loading begins
          setError("");

          // A search request is sent to the TMDB API.
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
            { signal: signal }
          );

          // HTTP error checking
          if (!res.ok) {
            throw new Error("Bilinmeyen hata oluştu.");
          }

          // Incoming data is converted to JSON format
          const data = await res.json();

          // An error will be thrown if the movie is not found
          if (data.total_results === 0) {
            throw new Error("Film bulunamadı.");
          }

          // States are updated
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        } catch (err) {
          // No error will be shown if the request was cancelled
          if (err.name === "AbortError") {
            console.log("aborted...");
          } else {
            // Other errors are shown to the user
            setError(err.message);
          }
        }
        setLoading(false); // Loading ends
      }

      // If the search term is shorter than 4 characters, no action will be taken
      if (query.length < 4) {
        setMovies([]);
        setError("");
        return;
      }

      getMovies(currentPage); // The movie search function is called

      // Cleanup: When the component is unmounted or the effect runs again
      //  // the fetch request is cancelled
      return () => {
        controller.abort();
      };
    },
    [query, currentPage]
  );

  // Hook returns state and functions to the outside
  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    total_results,
    nextPage,
    PreviousPage,
  };
}