import {Request, Response} from 'express';
import { MOVIES } from "./movies";



export function deleteMovie (req: Request, res: Response) {
    const id: string = req.query["id"];
    let index = MOVIES.findIndex(d => d.id == id);
    
    if (index === -1)
        return;

    console.log("index: ", index);

    setTimeout(function() {
        res.status(200).json(
            {
                payload :  MOVIES.splice(index, 1)
            }
        );
    }, 500);

    

}