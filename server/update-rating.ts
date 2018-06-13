import {Request, Response} from 'express';
import { MOVIES } from "./movies";
import Movie from 'src/app/model/movie';

export function updateRating(req: Request, res: Response) {
    //console.log(req.body);
    const movieId = req.body.id;
    const movies = Object.keys(MOVIES).map(function(key) {
        return MOVIES[key];
    });

    const movie: Movie = movies.find(movie => movie.id == movieId);  

    movie.my_rating = req.body.rating;

    res.status(200).json(movie);
}