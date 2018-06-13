import * as express from 'express';
import {Application} from "express";

import { getAllMovies } from "./get-movies";
import { searchMovie } from "./search-movies";
import { updateWatch } from "./update-watch";
import { updateRating } from "./update-rating";
import { deleteMovie } from "./delete-movie";
import { getMoviesCount } from "./get-movie-count";


const app: Application = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/data/movies.php').get(getAllMovies); // DONE
app.route('/data/movies.php').get(getAllMovies); // DONE
app.route('/data/search.php').get(searchMovie); // DONE
app.route('/data/updateWatch.php').put(updateWatch); // DONE
app.route('/data/updateRating.php').put(updateRating);
app.route('/data/deleteMovie.php').delete(deleteMovie); // DONE
app.route('/data/moviesCount.php').get(getMoviesCount); // DONE

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




