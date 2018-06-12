import {Request, Response} from 'express';
import { MOVIES } from "./movies";

export function updateWatch(req: Request, res: Response) {
    console.log(req.body);
    //console.log(res);
    const movieId = req.body.id;
    //const courses = Object.values(COURSES);
    const movies = Object.keys(MOVIES).map(function(key) {
        return MOVIES[key];
    });
    const movie = movies.find(movie => movie.id == movieId);  

    movie.is_watched = req.body.watched;

    res.status(200).json(movie);
}