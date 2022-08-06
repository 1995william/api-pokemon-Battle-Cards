import { Request, Response } from "express";

export class PokemonController {

    static home = (req: Request, res: Response) => {
        res.json("Welcome to api pokemon battle cards");
      }
    
    static findAll = (req: Request, res: Response) => {
        res.status(200).json("GET all pokemóns");
      }
}