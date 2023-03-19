const movieSearchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('.movieList_items');
const btn = document.querySelector('.btn');
const btnMore = document.querySelector('.btnMore');
let currentPage = 1;
async function getMovies(searchTerm, page) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=${page}&apikey=3b4db9a4`;
    const res = await fetch(URL);
    const data = await res.json();
    return data;
}
async function listMovies(searchTerm, page) {
    const data = await getMovies(searchTerm, page);
    const movies = data.Search;
    displayMovies(movies);
    return movies;
}
function displayMovies(movies) {
    movies.forEach(movie => {
        const listItem = document.createElement('li');
        const title = document.createElement('p');
        const poster = document.createElement('img');
        const year = document.createElement('p');

        title.innerText = movie.Title;
        poster.src = movie.Poster;
        year.innerText = movie.Year;

        searchList.appendChild(listItem);
        listItem.appendChild(title);
        listItem.appendChild(poster);
        listItem.appendChild(year);
    });
}
async function load() {
    currentPage = 1;
    searchList.innerHTML = '';
    // currentPage++;
    const searchTerm = movieSearchBox.value.trim();
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=${currentPage}&apikey=e0ffe730`;
    const res = await fetch(URL);
    const data = await res.json();
    displayMovies(data.Search, true);
}
btn.addEventListener('click', load);
async function loadMore() {
    searchList.innerHTML = '';
    currentPage++;
    const searchTerm = movieSearchBox.value.trim();
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=${currentPage}&apikey=e0ffe730`;
    const res = await fetch(URL);
    const data = await res.json();
    displayMovies(data.Search, true);
}
btnMore.addEventListener('click',loadMore);

