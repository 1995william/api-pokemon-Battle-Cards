import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";

export class PokemonController {
  static home = (req: Request, res: Response) => {
    res.status(200).json("Welcome to api pokemon battle cards");
  };

  static findAll = async (req: Request, res: Response) => {
    try {
     const pokemons = await pokemonModel.find();
     const pokeOrderAsc = pokemons.sort((a,b)=> a._id - b._id);
     
     res.status(200).json(pokeOrderAsc);
      
    } catch (error:any) {
      res.status(404).json({"error in response": error.message})
    }
  };

  static findOneByid = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
     const pokemons = await pokemonModel.findOne({_id: id});
     res.status(200).json(pokemons);
      
    } catch (error:any) {
      res.status(404).json({"error in response": error.message});
    }
  };

  static findOneByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
     const pokemons = await pokemonModel.findOne({name: name});
     res.status(200).json(pokemons);
      
    } catch (error:any) {
      res.status(404).json({"error in response": error.message});
    }
  };

  static register = async (req: Request, res: Response) => {
    const newPokemon = req.body;
    try {
        await pokemonModel.create(newPokemon);
        res.status(201).json({ "pokemon registered successfully": newPokemon });
        
    } catch (error:any) {
        res.status(404).json({ "error in request": error.message });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pokemon = req.body;
    try {
     const pokemonUpdated = await pokemonModel.findOneAndUpdate({_id:id}, pokemon);
     if(pokemonUpdated === null) return res.status(404).json({ "Pokemon not found _id": id });
      res.status(200).json({ "pokemon updated successfully": pokemonUpdated });
      
    } catch (error:any) {
      res.status(404).json({ "error in request": error.message });
    }
  };

  static updateByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const pokemon = req.body;
    try {
     const pokemonUpdated = await pokemonModel.findOneAndUpdate({name: name}, pokemon);

      if(pokemonUpdated === null) return res.status(404).json({ "Pokemon not found name": name }) ;
      res.status(200).json({ "pokemon updated successfully": pokemonUpdated });
      
    } catch (error:any) {
      res.status(404).json({ "error in request": error.message });
    }
  };

  static remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
      const pokemonRemoved = await pokemonModel.findByIdAndRemove(id);
      res.status(200).json({ "pokemon successfully removed": pokemonRemoved });
      
    } catch (error:any) {
      res.status(404).json({ "error in request": error.message });
    }
  };
}
