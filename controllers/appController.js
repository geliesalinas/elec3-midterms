const fs = require("fs");

const getIndex = (req,res) => {
    fs.readFile(__dirname + "/" + "movies.json", 'utf8', function (err, data) {
        let movies = JSON.parse(data);
        res.render("index", {title: "Movie List", movies: movies});
    });
};

const getAddMovie = (req,res) => {
    res.render("addMovie",{title: "Add Movie"});
};

const postAddMovie = (req,res) => {
    fs.readFile(__dirname + "/" + "movies.json", 'utf8', function (err, data) {
        let movies = JSON.parse(data);
        let lastID;

        Object.keys(movies).forEach(function(key) {
            lastID = movies[key].id;
        });
        let movieTitle = "movie" + (lastID + 1);
        let movie = {
            "id": lastID + 1,
            "title": req.body.title,
            "plot": req.body.plot,
            "director": req.body.director,
            "dateReleased": req.body.date,
            "Actors": req.body.actors,
            "Genre": req.body.genre,
            "Image":req.file.originalname
        } 
        
        movies[movieTitle] = movie;

        fs.writeFile(__dirname + "/" + "movies.json", JSON.stringify(movies), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(movies));
        });

        res.redirect("/");
    });
};

const getEditMovie = (req, res) =>{
    fs.readFile(__dirname + "/" + "movies.json", 'utf8', function (err, data) {
        let movies = JSON.parse(data);
        res.render("EditMovie", {title: "Edit Movie", movie: movies["movie" + req.params.id]});
    });
};

const postEditMovie = (req, res) =>{
    fs.readFile(__dirname + "/" + "movies.json", 'utf8', function (err, data) {
        let movies = JSON.parse(data);

        let movieTitle = "movie" + req.body.movieId;
        let movie = {
            "id": req.body.movieId,
            "title": req.body.title,
            "plot": req.body.plot,
            "director": req.body.director,
            "dateReleased": req.body.date,
            "Actors": req.body.actors,
            "Genre": req.body.genre,
            "Image": req.file == null ? req.body.prevImg : req.file.originalname
        } 
        
        movies[movieTitle] = movie;

        fs.writeFile(__dirname + "/" + "movies.json", JSON.stringify(movies), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(movies));
        });

        res.redirect("/");
    });
};

const deleteMovie = (req, res) =>{
    fs.readFile(__dirname + "/" + "movies.json", 'utf8', function (err, data) {
        let movies = JSON.parse(data);

        delete movies["movie" + req.params.id];

        fs.writeFile(__dirname + "/" + "movies.json", JSON.stringify(movies), function writeJSON(err) {
            if (err) return console.log(err);
        });

        
    });
    res.redirect("/");
};

module.exports = {getIndex, getAddMovie, postAddMovie, getEditMovie, postEditMovie, deleteMovie};