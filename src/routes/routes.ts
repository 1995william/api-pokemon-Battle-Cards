import express from "express";
import { PokemonController } from "../controllers/pokemonController";

const routes = express.Router();

routes.get("/", PokemonController.home);


export { routes };
