import {Request, Response} from 'express';
import { MOVIES } from "./movies";



export function searchMovie (req: Request, res: Response) {

    const query: string = req.query["query"];
    //console.log("query ", query);

    setTimeout(function() {
        res.status(200).json(
            {
                payload :  MOVIES.filter(item => item["name"].toLowerCase().indexOf(query.toLowerCase()) > -1 )
            }
        );
    }, 300);

    

}