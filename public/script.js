
const tmdbKey = "f10ef8267ab7b220bb26cd7a430a9ff0";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
const firstRequestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
const firstUrlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${firstRequestParams}`;

try {
  const response = await fetch(firstUrlToFetch);
  if(response.ok) {
    const jsonResponse = await response.json();
    const totalPages = jsonResponse.total_pages;

    //Randomising the page results from different pages, with a maximum page index number of 500. 
    const maxPages = Math.min(totalPages, 500);
    const randomPage = Math.floor(Math.random() * maxPages) +1;

    const secondRequestParams =  `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
    const secondUrlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${secondRequestParams}`;

    //Adding second response to generate movies from Random pages
    const secondResponse = await fetch(secondUrlToFetch);
    if(secondResponse.ok) {
      const secondJsonResponse = await secondResponse.json();
      const movies = secondJsonResponse.results;
      return movies;
    }

  }
}



catch(error) {
  console.log(error);
}
};
const getMovieInfo = async (movie) => {

const movieId = movie.id;
const movieEndpoint = `/movie/${movieId}`;
const requestParams = `?api_key=${tmdbKey}`;
const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

try {
  const response = await fetch(urlToFetch);
  if(response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
  }

} 

catch(error) {
  console.log(error);
}
}

const getCastInfo = async (movieId) => {
    const castEndpoint =  `/movie/${movieId}/credits`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${castEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const castData = await response.json();
            return castData.cast;
            
            
        }
    }
    catch(error) {
        console.log(error);
    }
}

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

const LikeMovie = () => {
  const movieTitle = document.getElementById('movieTitle').textContent;
  const movieOverview = document.getElementById('movieOverview').textContent;

  const likedMovie = {
    title : movieTitle,
    overview : movieOverview

  }

  addLikedMovie(likedMovie);

    //Display liked movies
    displayLikedMovie();
      //Clear current movie
  clearCurrentMovie();
 //Show random movie
 showRandomMovie();
  }

  //Clear current movie
  clearCurrentMovie();

  //Show random movie
  showRandomMovie();

  document.addEventListener('DOMContentLoaded', () => {
    displayLikedMovie();
  });

  const likeButton = document.getElementById('likeBtn');
  likeButton.onclick = LikeMovie;


getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
