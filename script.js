const apiKey = "5152877b"; // Replace with your OMDb API key
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    movieResults.innerHTML = `<p class="text-center text-white">Please enter a movie name!</p>`;
  }
});

function fetchMovies(query) {
  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.Search) {
        displayMovies(data.Search);
      } else {
        movieResults.innerHTML = `<p class="text-center text-white">No results found for "${query}"</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
      movieResults.innerHTML = `<p class="text-center text-white">Error fetching data. Please try again later.</p>`;
    });
}

function displayMovies(movies) {
  movieResults.innerHTML = ""; // Clear previous results
  movies.forEach(movie => {
    const movieCard = `
      <div class="col-md-4">
        <div class="card shadow-lg">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}" 
               class="card-img-top" alt="${movie.Title}">
          <div class="card-body">
            <h5 class="card-title text-center text-white">${movie.Title}</h5>
            <p class="text-center text-white"><strong>Year:</strong> ${movie.Year}</p>
            <div class="d-flex justify-content-center">
              <a href="movie-details.html?imdbID=${movie.imdbID}" class="btn btn-info btn-sm">View Info</a>
            </div>
          </div>
        </div>
      </div>
    `;
    movieResults.innerHTML += movieCard;
  });
}