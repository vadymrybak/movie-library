import * as express from 'express';
import {Application} from "express";

import { getAllMovies } from "./get-movies";
import { searchMovie } from "./search-movies";
import { updateWatch } from "./update-watch";


const app: Application = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.route('/data/movies').get(getAllMovies);
app.route('/data/search').get(searchMovie);
app.route('/data/updateWatch').put(updateWatch); // DONE



const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




