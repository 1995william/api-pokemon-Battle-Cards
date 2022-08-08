import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";

export class PokemonController {
  static home = (req: Request, res: Response) => {
    res.json("Welcome to api pokemon battle cards");
  };

  static findAll = async (req: Request, res: Response) => {
    try {
     const pokemons = await pokemonModel.find();
     res.status(200).json(pokemons);
      
    } catch (error:any) {
      res.status(404).json({"error in response": error.message})
    }
  };

  static register = async (req: Request, res: Response) => {
    const newPokemon = req.body;
    try {
        await pokemonModel.create(newPokemon)
        res.status(201).json({ "pokemon registered successfully": newPokemon });
        
    } catch (error:any) {
        res.status(404).json({ "error in request": error.message })
    }
  };

  static update = (req: Request, res: Response) => {
    const { id } = req.params;
    const updatePokemon = req.body;

    res.status(200).json({ "pokemon updated successfully": updatePokemon });
  };

  static remove = async (req: Request, res: Response) => {
    const { _id } = req.params;
    console.log(_id)
    try {
      const pokemonRemoved = await pokemonModel.findByIdAndRemove(_id)
      res.status(200).json({ "pokemon successfully removed": pokemonRemoved });
      
    } catch (error:any) {
      res.status(404).json({ "error in request": error.message })
    }
  };
}
