import express from "express";
import { PokemonController } from "../controllers/pokemonController";

const routes = express.Router();

routes.get("/", PokemonController.home);
routes.get("/pokemons", PokemonController.findAll);
routes.post("/pokemon", PokemonController.register);
routes.put("/pokemon/:id", PokemonController.update);
routes.delete("/pokemon/:_id", PokemonController.remove);

export { routes };
