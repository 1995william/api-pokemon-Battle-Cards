import express from "express";
import { PokemonController } from "../controllers/pokemonController";

const routes = express.Router();

routes.get("/", PokemonController.home);
routes.get("/pokemons", PokemonController.findAll);
routes.post("/pokemon", PokemonController.register);

export { routes };
