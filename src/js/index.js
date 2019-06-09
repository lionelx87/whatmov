import '@babel/polyfill';
import '../sass/styles.scss';
import '../css/materialize.min.css';
import '../js/materialize.min.js';
import { TheMovieDB } from '../js/tmdb';
import noMovie from '../img/no-movie.png';

const tmdb = new TheMovieDB();
const moviesList = document.querySelector('#movies-list');

// Buttons
const inTheatres = document.querySelector('#inTheatres');
const mostPopular = document.querySelector('#mostPopular');
const popularKids = document.querySelector('#popularKids');
const bestMovies = document.querySelector('#bestMovies');
const search = document.querySelector('#search');
const spinner = document.querySelector('#spinnerMovies');
const spinnerMovie = document.querySelector('#spinnerMovie');
const movieDetails = document.querySelector('#movieDetails');
// for Movie
const title = document.querySelector('#title');
const poster = document.querySelector('#poster');
const overview = document.querySelector('#overview');
const genres = document.querySelector('#genres');
const releaseDate = document.querySelector('#releaseDate');


// Events Listeners
inTheatres.addEventListener('click', () => {
    search.value = '';
    moviesList.innerHTML = '';
    spinner.classList.remove('hide');
    tmdb.inTheatres()
        .then(data => {
            spinner.classList.add('hide');
            const movies = data.results;
            let template = '';
            movies.forEach(movie => {
                template += generateTemplate(movie);
            });
            moviesList.innerHTML = template;
        });
});

mostPopular.addEventListener('click', () => {
    search.value = '';
    moviesList.innerHTML = '';
    spinner.classList.remove('hide');
    tmdb.getPopular()
        .then(data => {
            spinner.classList.add('hide');
            const movies = data.results;
            let template = '';
            movies.forEach(movie => {
                template += generateTemplate(movie);
            });
            moviesList.innerHTML = template;
        });
});

popularKids.addEventListener('click', () => {
    search.value = '';
    moviesList.innerHTML = '';
    spinner.classList.remove('hide');
    tmdb.popularKids()
        .then(data => {
            spinner.classList.add('hide');
            const movies = data.results;
            let template = '';
            movies.forEach(movie => {
                template += generateTemplate(movie);
            });
            moviesList.innerHTML = template;
        });
});

bestMovies.addEventListener('click', () => {
    search.value = '';
    moviesList.innerHTML = '';
    spinner.classList.remove('hide');
    tmdb.bestMovies()
        .then(data => {
            spinner.classList.add('hide');
            const movies = data.results;
            let template = '';
            movies.forEach(movie => {
                template += generateTemplate(movie);
            });
            moviesList.innerHTML = template;
        });
});

search.addEventListener('input', (e) => {
    // e.preventDefault();
    // moviesList.innerHTML = '';
    // if (e.target.value.length > 1) {
    //     spinner.classList.remove('hide');
    //     tmdb.search(e.target.value)
    //         .then(data => {
    //             spinner.classList.add('hide');
    //             const movies = data.results;
    //             let template = '';
    //             movies.forEach(movie => {
    //                 template += generateTemplate(movie);
    //             });
    //             moviesList.innerHTML = template;
    //         });
    // } else {
    //     moviesList.innerHTML = '';
    // }
});

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        moviesList.innerHTML = '';
        if (e.target.value.length > 1) {
            spinner.classList.remove('hide');
            tmdb.search(e.target.value)
                .then(data => {
                    spinner.classList.add('hide');
                    const movies = data.results;
                    let template = '';
                    movies.forEach(movie => {
                        template += generateTemplate(movie);
                    });
                    moviesList.innerHTML = template;
                });
        } else {
            moviesList.innerHTML = '';
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const instance = M.Modal.init(modal, {
        opacity: 0.7,
        onOpenStart: () => {

        }
    });
});


const generateTemplate = (movie) => {
    return `        
        <div class="card hoverable">
            <div class="card-image">
                <img src="${movie.poster_path !== null? "https://image.tmdb.org/t/p/w300"+movie.poster_path : noMovie }" >
                <span class="card-title">${movie.original_title}</span>
            </div>
            <div class="card-content">
                <p>${movie.overview !== ""? movie.overview : 'No hay descripción'}</p>
            </div>
            <div class="card-action">
                <a href="#movie" class="modal-trigger" data-movie-id="${movie.id}">Ver Detalle</a>
            </div>
        </div>    
    `;
};

moviesList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.dataset.movieId !== undefined) {
        movieDetails.classList.add('hide');
        spinnerMovie.classList.remove('hide');
        const movieId = e.target.dataset.movieId;
        tmdb.getMovie(movieId)
            .then(data => {
                spinnerMovie.classList.add('hide');
                movieDetails.classList.remove('hide');
                console.log(data);
                title.innerHTML = data.title;
                poster.setAttribute('src', `${data.poster_path !== null? "https://image.tmdb.org/t/p/w300"+data.poster_path : noMovie}`);
                overview.innerHTML = data.overview;
                const generos = data.genres.map(genre => genre.name).join(" - ");
                genres.innerHTML = generos;
                releaseDate.innerHTML = data.release_date;
            });
    }
});