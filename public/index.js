console.log("Loaded!");

let url = "";
let userMovies = [];  // user selected movies
let movies;

function getFile(path, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // The request is done; did it work?
            if (xhr.status === 200) {
                // ***Yes, use `xhr.responseText` here***
                callback(xhr.responseText);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
            }
        }
    };
    xhr.open("GET", path);
    xhr.send();
}

// callback when movie JSON file is retrieved
function handleFileData(fileData) {
    if (!fileData) {
        // Show error
        console.error("handleFileData error");
        return;
    }
    // use the file data
    movies = JSON.parse(fileData);
    // console.log(movies);
}


let movieInput = document.getElementById('movieInput');
let movieDropdown = document.getElementById('movieDropdown');

movieInput.addEventListener("input", handleDropdown);
movieInput.addEventListener('focus', handleDropdown);


function handleDropdown(e) {
    clearDropdownAndHide();

    let text = e.target.value;
    if (text.length > 1) {
        movieDropdown.classList.remove('hide');

        // filter arr with input text
        let arr = movies.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
        arr.map(movie => {
            // add subitem
            let subItem = document.createElement('button');
            movieDropdown.appendChild(subItem);
            subItem.setAttribute('type', 'button');
            subItem.classList.add('list-group-item');
            subItem.classList.add('list-group-item-action');
            subItem.textContent = movie.title;
            subItem.addEventListener('click', (e) => {
                let movie = getMovie(e.target.textContent);
                if (!userMovies.includes(movie)) {
                    userMovies.push(movie);
                    console.log(userMovies);
                    addTableRow(movie, false);
                    clearDropdownAndHide();
                    movieInput.value = '';
                }
            });
        });
        // if empty, hide
        if (!movieDropdown.firstChild) movieDropdown.classList.add('hide');
    }
}

// can return undefined
function getMovie(title) {
    return movies.find(movie => {
        return movie.title === title;
    });
}

function clearDropdownAndHide() {
    // clear
    while (movieDropdown.firstChild) movieDropdown.firstChild.remove();
    movieDropdown.classList.add('hide');
}

// adds selected movie to table UI
function addTableRow(movie, isRecs) {
    let tableBody = document.getElementById(isRecs ? 'recsTableBody' : 'tableBody');
    let tr = document.createElement('tr');
    // title
    let th = document.createElement('th');
    th.textContent = movie.title;
    tr.appendChild(th);
    // genres
    let td = document.createElement('td');
    td.textContent = movie.genres.replace(/\|/g, ", ");  // replace all '|' with ', '
    tr.appendChild(td);
    // poster
    let td2 = document.createElement('td');
    let img = document.createElement('img');
    img.src = "poster-placeholder.png";
    img.classList.add('posterImg');
    td2.appendChild(img);
    tr.appendChild(td2);
    // add row to table
    tableBody.appendChild(tr);
    requestPoster(movie, img);  // fetches img url
}

// recommend button
// queries server for movie recommendations
// button is disabled while loading
let recommendButton = document.getElementById('recommendButton');
recommendButton.addEventListener('click', () => {
    if (userMovies.length < 1) {
        alert('Please select at least 1 movie.');
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + '/getrecs');
    xhr.setRequestHeader("Content-Type", "application/json");

    let userMovieIds = userMovies.map(movie => movie.movieId);
    recommendButton.setAttribute('disabled', 'disabled');

    xhr.send(JSON.stringify({"ids": userMovieIds}));

    xhr.onload = function () {
        if (xhr.status !== 200) { // analyze HTTP status of the response
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            console.log(xhr.responseText);
            handleRecs(JSON.parse(xhr.responseText));
        }
        recommendButton.removeAttribute('disabled');
    };

    xhr.onerror = function () {
        alert("Request failed");
        recommendButton.removeAttribute('disabled');
    };
});

// clear userMovies, update table UI
let clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    userMovies = [];
    let tableBody = document.getElementById('tableBody');
    tableBody.textContent = '';
    let recsTableBody = document.getElementById('recsTableBody');
    recsTableBody.textContent = '';
});

// given array of recIds
function handleRecs(recIds) {
    // console.log(recIds);
    let recs = movies.filter(movie => recIds.includes(movie.movieId));
    console.log(recs);
    // clear old recs
    let recsTableBody = document.getElementById('recsTableBody');
    recsTableBody.textContent = '';
    // load new recs
    recs.map((movie) => {
        addTableRow(movie, true);
    });
}

// input: movie and <img> object
// Sets img src to movie poster link, or does nothing if unavailable
function requestPoster(movie, imgObj) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + '/getposter?tmdbId=' + movie.tmdbId);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onload = function () {
        if (xhr.status !== 200) { // analyze HTTP status of the response
            console.error(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else {
            let posterData = JSON.parse(xhr.responseText);
            console.log(posterData);
            imgObj.src = posterData.url;
        }
    };

    xhr.onerror = function () {
        console.error("Movie poster request failed: " + movie);
    };
}


getFile(url + 'export_df.json', handleFileData);