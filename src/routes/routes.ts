import express from "express";
import { BattleController } from "../controllers/battleController";
import { PokemonController } from "../controllers/pokemonController";

const routes = express.Router();

routes.get("/", PokemonController.home);
routes.get("/pokemons", PokemonController.findAll);
routes.get("/pokemon/id/:id", PokemonController.findOneByid);
routes.get("/pokemon/name/:name", PokemonController.findOneByName);
routes.post("/pokemon", PokemonController.register);
routes.post("/battle", BattleController.arena);
routes.put("/pokemon/id/:id", PokemonController.updateById);
routes.put("/pokemon/name/:name", PokemonController.updateByName);
routes.delete("/pokemon/id/:id", PokemonController.remove);

export { routes };
