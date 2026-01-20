import { useState } from "react";
import useMovieDetails from "../../hooks/useMovieDetails";
import Loading from "../Loading";
import StarRating from "../StarRating";

export default function MovieDetails({
  selectedMovie, // Selected movie ID
  onUnSelectMovie, // Callback to close film details
  onAddToList, // Callback to add the movie to the list
  selectedMovies, // Movies added to the list by the user
}) {
  // State that holds the score given by the user
  const [userRating, setUserRating] = useState("");

  // Get details and loading status of the selected movie
  const { movie, loading } = useMovieDetails(selectedMovie);

  // Checking if the film has been added to the list before
  const isAddedToList = selectedMovies.map((m) => m.id).includes(selectedMovie);
  // If the movie is added to the list, find the rating given by the user
  const selectedMovieUserRating = selectedMovies.find(
    (m) => m.id === selectedMovie
  )?.userRating;

  // Adding a movie to the list
  function handleAddToList() {
    const newMovie = {
      ...movie,
      userRating,
    };
    onAddToList(newMovie);
  }

  return (
    <>
      {/* Show loading if data is loading */}
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-2 mb-3">
          <div className="row">
            <div className="col-4">
              <img
                src={
                  movie.poster_path
                    ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                      movie.poster_path
                    : "/img/no-image.jpg"
                }
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-8">
              <h6>{movie.title}</h6>
              <p>
                <i className="bi bi-calendar2-date me-1"></i>
                <span>{movie.release_date}</span>
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </p>
            </div>
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.overview}</p>
              <p>
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge text-bg-primary me-1">
                    {genre.name}
                  </span>
                ))}
              </p>

              {/* If the movie is not added to the list */}
              {!isAddedToList ? (
                <>
                  <div className="my-4">
                    <StarRating
                      maxRating={10}
                      size={20}
                      onRating={setUserRating}
                    />
                  </div>
                  <button
                    className="btn btn-primary me-1"
                    onClick={() => handleAddToList(movie)}
                  >
                    Listeye Ekle
                  </button>
                </>
              ) : (
                <p>
                  Film listenizde. Değerlendirme:{" "}
                  <i className="bi bi-stars text-warning me-1"></i>
                  {selectedMovieUserRating}
                </p>
              )}

              <button className="btn btn-danger" onClick={onUnSelectMovie}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}