import useLocalStorage from "./hooks/useLocalStorage";
import useMovies from "./hooks/useMovies";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResults from "./components/Navbar/NavSearchResults";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MyMovieList from "./components/SelectedMovies/MyMovieList";
import MovieDetails from "./components/Movies/MovieDetails";

import { useState } from "react";

export default function App() {
  // Search query (default: "father")
  const [query, setQuery] = useState("father");
  // User-selected movies (stored in localStorage)
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
 // The current state of the selected movie ID
  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    total_results,
    nextPage,
    PreviousPage,
  } = useMovies(query);

  // Movie selection/extraction handler (by ID)
  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  // Remove selected movie handler
  function handleUnselectMovie() {
    setSelectedMovie(null);
  }

  // Handler for adding and deselecting movies to the list
  function handleAddToList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnselectMovie();
  }

  // Handler for deleting movies from the list (by ID)
  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) => selectedMovies.filter((m) => m.id !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResults total_results={total_results} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {/* Loading indicator while data is loading */}
              {loading && <Loading />}
              {/* Movie list and pagination if no loading or error occurs */}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectedMovie}
                        selectedMovie={selectedMovie}
                      />
                      <Pagination
                        nextPage={nextPage}
                        PreviousPage={PreviousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
                    </>
                  )}
                </>
              )}
              {/* Show error message if there is an error */}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              {/* Details of the selected film  */}
              {selectedMovie ? (
                <MovieDetails
                  selectedMovie={selectedMovie}
                  onUnSelectMovie={handleUnselectMovie}
                  onAddToList={handleAddToList}
                  selectedMovies={selectedMovies}
                />
              ) : (
                <>
                  {/* Summary of the user's selected films */}
                  <MyListSummary selectedMovies={selectedMovies} />
                  {/* User's selected movie list */}
                  <MyMovieList
                    selectedMovies={selectedMovies}
                    onDeleteFromList={handleDeleteFromList}
                  />
                </>
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}