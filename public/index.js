console.log("Loaded!");

let url = "http://localhost:3000";
let userMovies = [];  // user selected movies
let movies;
getFile(url + '/data/export_df.json', handleFileData);

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
        console.log("handleFileData error");
        return;
    }

    // use the file data
    movies = JSON.parse(fileData);
    console.log(movies);

    // insert movies into search
    let search = document.getElementById('search');
    movies.map((movie) => {
        let item = document.createElement('option');
        item.innerHTML = movie.title;
        search.appendChild(item)
    });
    $('#search').selectpicker('refresh');
}

// event listener: new selection adds to array and table
$('#search').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    console.log('new movie selected');
    if (!userMovies.includes(movies[clickedIndex - 1])) {
        userMovies.push(movies[clickedIndex - 1]);
        console.log(userMovies);
        updateTable();
    }
});

// adds selected movie to table UI
function updateTable() {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    userMovies.map((movie) => {
        let text = `<tr><th scope=\"row\"> ${movie.movieId} </th><td> ${movie.title} </td><td> ${movie.genres} </td></tr>`;
        tableBody.innerHTML += text;
    })
}

let recommendButton = document.getElementById('recommendButton');
recommendButton.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + '/getrecs');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"userMovies": userMovies}));

    xhr.onload = function () {
        if (xhr.status !== 200) { // analyze HTTP status of the response
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
        }
    };

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            alert(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
            alert(`Received ${event.loaded} bytes`); // no Content-Length
        }

    };

    xhr.onerror = function () {
        alert("Request failed");
    };
});

let clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    // clear userMovies, refresh UI
    userMovies = [];
    updateTable();
});

