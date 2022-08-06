import { Request, Response } from "express";

export class PokemonController {
  static home = (req: Request, res: Response) => {
    res.json("Welcome to api pokemon battle cards");
  };

  static findAll = (req: Request, res: Response) => {
    res.status(200).json("GET all pokemóns");
  };

  static register = (req: Request, res: Response) => {
    const newPokemon = req.body;

    res.status(201).json({ "pokemon registered successfully": newPokemon });
  };

  static update = (req: Request, res: Response) => {
    const { id } = req.params;
    const updatePokemon = req.body;

    res.status(200).json({ "pokemon updated successfully": updatePokemon });
  };
}
