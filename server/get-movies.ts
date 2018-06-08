import {Request, Response} from 'express';
import { MOVIES } from "./movies";



export function getAllMovies (req: Request, res: Response) {

    setTimeout(function() {
        res.status(200).json(
            {
                payload :  MOVIES
            }
        );
    }, 300);

    

}