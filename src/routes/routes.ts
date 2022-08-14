import express from "express";
import { BattleController } from "../controllers/battleController";
import { PokemonController } from "../controllers/pokemonController";
import { ScoreController } from "../controllers/scoreController";

const routes = express.Router();

routes.get("/", PokemonController.home);
routes.get("/pokemons", PokemonController.findAll);
routes.get("/scores", ScoreController.scoreTotal);
routes.get("/pokemon/id/:id", PokemonController.findOneByid);
routes.get("/pokemon/name/:name", PokemonController.findOneByName);
routes.post("/pokemon", PokemonController.register);
routes.post("/battle", BattleController.arena);
routes.post("/scores", ScoreController.create);
routes.put("/pokemon/update/id/:id", PokemonController.updateById);
routes.put("/pokemon/update/name/:name", PokemonController.updateByName);
routes.delete("/pokemon/delete/:id", PokemonController.remove);

export { routes };
