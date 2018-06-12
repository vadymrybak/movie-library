import {Request, Response} from 'express';
import { MOVIES } from "./movies";



export function searchMovie (req: Request, res: Response) {

    const query: string = req.query["query"];
    const from: string = req.query["from"];
    const to: string = req.query["to"];

    let result: Array<any> = [];

    result = MOVIES.filter(item => item["name"].toLowerCase().indexOf(query.toLowerCase()) > -1 );

    if (from !== "" || to !== ""){
        result = result.filter(item => item["year"] >= from && item["year"] <= to);
    }

    setTimeout(function() {
        res.status(200).json(
            {
                payload :  result
            }
        );
    }, 300);

    

}