document.addEventListener('DOMContentLoaded', () => {
    const movieButtons = document.getElementById('movieButtons');
    const movieDetails = document.getElementById('movieDetails');
    const addMovieButton = document.getElementById('addMovieButton');
    const formContainer = document.getElementById('formContainer');
  
    // initial movie data
    let movies = [
      {
        title: "Inception",
        genre: "Sci-Fi",
        description: "A thief who steals corporate secrets through use of dream-sharing technology.",
        time: "148 min",
        image: "assets/images/inception.jpg"
      },
      {
        title: "The Dark Knight",
        genre: "Action",
        description: "When the menace known as the Joker emerges from his mysterious past.",
        time: "152 min",
        image: "assets/images/dark_knight.jpg"
      }
    ];
  
    // retrieve movies from local storage if available
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      movies = JSON.parse(storedMovies);
    } else {
      // save initial movie data to local storage
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  
    // renders movies on page load
    renderMovies();
  
    // function to render the movie buttons
    function renderMovies() {
      movieButtons.innerHTML = '';
      movies.slice(0, 50).forEach((movie, index) => {
        const button = document.createElement('button');
        button.innerText = movie.title;
        button.addEventListener('click', () => displayMovieDetails(movie, index));
        const listItem = document.createElement('li');
        listItem.appendChild(button);
        movieButtons.appendChild(listItem);
      });
      if (movies.length > 0) {
        displayMovieDetails(movies[0], 0);
      }
    }
  
    // function to display movie details
    function displayMovieDetails(movie, index) {
      movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.image}" alt="${movie.title}">
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Description:</strong> ${movie.description}</p>
        <p><strong>Time:</strong> ${movie.time}</p>
        <button onclick="editMovie(${index})">Edit</button>
      `;
    }
  
    // funct to edit a movie's details
    window.editMovie = function (index) {
      localStorage.setItem('editIndex', index);
      window.location.href = 'form.html';
    };
  
    // add a new movie to the list
    addMovieButton.addEventListener('click', () => {
      localStorage.removeItem('editIndex');
      window.location.href = 'form.html';
    });
  
    // func to display a list of movies in the movie container
    function displayMovies() {
      const movieContainer = document.getElementById('movieContainer');
      movieContainer.innerHTML = ''; // clears any existing content
  
      movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
  
        movieElement.innerHTML = `
          <h2>${movie.title}</h2>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Description:</strong> ${movie.description}</p>
          <p><strong>Time:</strong> ${movie.time}</p>
          <img src="${movie.image}" alt="${movie.title} image">
        `;
  
        movieContainer.appendChild(movieElement);
      });
    }
  
    // call to display movies
    displayMovies();
  });
  