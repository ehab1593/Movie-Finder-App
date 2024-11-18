// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// After liking a movie, clears the current movie from the screen and gets another random movie


// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

const createReleaseDate = (releaseDate) => {
    const overviewDate = document.createElement('p');
    overviewDate.setAttribute('id', 'releaseDate');
    overviewDate.innerHTML = `Release Date: ${releaseDate}`;

  
    return overviewDate;
};

const createMovieCast = (cast) => {
    const castParagraph = document.createElement('p');
    castParagraph.setAttribute('id', 'cast');
    castParagraph.innerHTML = cast;

    return castParagraph;
}

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = async (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
    const releaseDate = createReleaseDate(movieInfo.release_date);

  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(releaseDate);

    const castInfo = await getCastInfo(movieInfo.id);
  if (castInfo) {
    const castList = createCastList(castInfo);
    movieTextDiv.appendChild(castList);
  }
  
  console.log(movieInfo);
    showBtns();
    likeBtn.onclick = LikeMovie;
    dislikeBtn.onclick = dislikeMovie;
};


const createCastList = (castArray) => {
    const castContainer = document.createElement('div');
    castContainer.setAttribute('id', 'castList');
    const castHeader = document.createElement('h3');
    castHeader.textContent = 'Cast:';
    castContainer.appendChild(castHeader);
  
    // Limit the cast list to the first 5 actors
    const topCast = castArray.slice(0, 5);
    topCast.forEach((actor) => {
      const actorName = document.createElement('p');
      actorName.textContent = actor.name;
      castContainer.appendChild(actorName);
    });
  
    return castContainer;
  };

//Retrieving the liked movie object and saving it as array
  const getLikedMovie = () => {
    const likedMovies = localStorage.getItem('likedMovies');
    return likedMovies ? JSON.parse(likedMovies) : [];
  }


  //Saving liked movies to the storage
  const saveLikedMovies = (movies) => {
    localStorage.setItem('likedMovies', JSON.stringify(movies));
  }

//Adding the liked movie to the array and saving it to local storage
  const addLikedMovie = (movie) => {
    const likedMovies = getLikedMovie();
    likedMovies.push(movie);
    saveLikedMovies(likedMovies);
  }

  const displayLikedMovie = () => {
    const likedMovies = getLikedMovie();
    const likedMoviesList  = document.getElementById('likedMoviesList');
    likedMoviesList.innerHTML = '';

    
      // Loop through the likedMovies array and create HTML for each movie
    likedMovies.forEach((movie, index) => {

        const movieList = document.createElement('div');

         movieList.innerHTML = `<h3 id="title">${movie.title} <button id="btn-remove" onclick="removeLikedMovie(${index})">x</button></h3><p>${movie.overview}</p> `;
       likedMoviesList.appendChild(movieList);
       
    });
}

const removeLikedMovie = (index) => {
  let likedMovies = getLikedMovie();

    likedMovies.splice(index, 1);

    saveLikedMovies(likedMovies);

    displayLikedMovie();
}