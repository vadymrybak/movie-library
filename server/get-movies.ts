import {Request, Response} from 'express';
import { MOVIES } from "./movies";



export function getAllMovies (req: Request, res: Response) {

    const startIndex: string = req.query["startIndex"];
    const endIndex: string = req.query["endIndex"];

    setTimeout(function() {
        res.status(200).json(
            {
                payload :  MOVIES.slice(startIndex, endIndex)
            }
        );
    }, 1500);

    

}