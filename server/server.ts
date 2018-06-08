import * as express from 'express';
import {Application} from "express";

import { getAllMovies } from "./get-movies";


const app: Application = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.route('/data/movies').get(getAllMovies);



const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




