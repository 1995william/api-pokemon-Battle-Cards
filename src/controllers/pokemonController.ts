import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";
import { cardPokemon } from "../validation/cardPokemon";

export class PokemonController {
  static home = (req: Request, res: Response) => {
    res.status(200).json("Welcome to api pokemon battle cards. To start access the route /docs");
  };

  static findAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 10;

    try {
      const pokemons = await pokemonModel.find().skip(page * limit).limit(limit).sort('_id');
      
      if (pokemons.length === 0) return res.status(404).json("not found");
      res.status(200).json(pokemons);

    } catch (error) {
      res.status(400).json({ "error in response": error.message })
    }
  };

  static findOneByid = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const pokemons = await pokemonModel.findOne({ _id: id });
      if (pokemons === null) return res.status(404).json({ "Pokemon not found _id": id });
      res.status(200).json(pokemons);

    } catch (error) {
      res.status(400).json({ "error in response": error.message });
    }
  };

  static findOneByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const firstLetterUpperCase = `${name[0].toUpperCase()}${name.substring(1)}`;

    try {
      const pokemons = await pokemonModel.findOne({ name: firstLetterUpperCase });
      if (pokemons === null) return res.status(404).json({ "Pokemon not found name": firstLetterUpperCase });
      res.status(200).json(pokemons);

    } catch (error) {
      res.status(400).json({ "Bad request": error.message });
    }
  };

  static register = async (req: Request, res: Response) => {
    const newPokemon = req.body;
    const validPokemon = cardPokemon(newPokemon);
    
    if (validPokemon !== true) return res.status(400).json({ "Bad request": validPokemon[0].message });

    try {
      const pokemons = await pokemonModel.find();
      const checkPokemonId = pokemons.find((el)=> el._id === newPokemon._id);
      if(checkPokemonId !== undefined) return res.status(400).json({ "Pokemon exists in database _id": newPokemon._id});
     
      await pokemonModel.create(newPokemon);
      res.status(201).json({ "pokemon registered successfully": newPokemon });

    } catch (error) {
      res.status(400).json({ "Bad request": error.message });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pokemon = req.body;
    const validPokemon = cardPokemon(pokemon);

    if (validPokemon !== true) return res.status(400).json({ "Bad request": validPokemon[0].message });

    try {
      const pokemonUpdated = await pokemonModel.findOneAndUpdate({ _id: id }, pokemon);
      if (pokemonUpdated === null) return res.status(404).json({ "Pokemon not found _id": id });
      res.status(200).json({ "pokemon updated successfully": pokemon });

    } catch (error) {
      res.status(400).json({ "Bad request": error.message });
    }
  };

  static updateByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const pokemon = req.body;
    const firstLetterUpperCase = `${name[0].toUpperCase()}${name.substring(1)}`;
    const validPokemon = cardPokemon(pokemon);

    if (validPokemon !== true) return res.status(400).json({ "Bad request": validPokemon[0].message });
    
    try {
      const pokemonUpdated = await pokemonModel.findOneAndUpdate({ name: firstLetterUpperCase }, pokemon);

      if (pokemonUpdated === null) return res.status(404).json({ "Pokemon not found name": name });
      res.status(200).json({ "pokemon updated successfully": pokemon });

    } catch (error) {
      res.status(400).json({ "Bad request": error.message });
    }
  };

  static remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const pokemonRemoved = await pokemonModel.findByIdAndRemove(id);
      if (pokemonRemoved === null) return res.status(404).json({ "Pokemon not found _id": id });
      res.status(200).json({ "pokemon successfully removed": pokemonRemoved });

    } catch (error) {
      res.status(400).json({ "Bad request": error.message });
    }
  };
}
