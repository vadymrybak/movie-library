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

app.route('/data/movies').get(getAllMovies);
app.route('/data/search').get(searchMovie);
app.route('/data/updateWatch').put(updateWatch);
app.route('/data/updateRating').put(updateRating);
app.route('/data/deleteMovie').delete(deleteMovie);
app.route('/data/moviesCount').get(getMoviesCount);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




