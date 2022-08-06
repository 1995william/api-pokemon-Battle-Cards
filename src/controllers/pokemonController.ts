import { Request, Response } from "express";

export class PokemonController {

    static home = (req: Request, res: Response) => {
        res.json("Welcome to api pokemon battle cards");
      }
      
}