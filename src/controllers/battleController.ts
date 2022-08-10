import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";
import { ResultModel } from "../models/resultModel";
export class BattleController {
  static arena = async (req: Request, res: Response) => {
    const { playerOneCard, playerTwoCard } = req.body;
    
    if(!playerOneCard) return res.status(404).json({"Player is required": "playerOneCard"});
    if(!playerTwoCard) return res.status(404).json({"Player is required": "playerTwoCard"});

    try {
      const battleResult = await this.battle(playerOneCard, playerTwoCard);
      res.status(201).json(battleResult);
    } catch (error) {

      const pokemons = await pokemonModel.find();
      pokemons.find(el => el._id === playerOneCard) === undefined ?
        res.status(404).json({
          "Pokemon not found _id": playerOneCard,
          "error": error.message
        }) :
        res.status(404).json({
          "Pokemon not found _id": playerTwoCard,
          "error": error.message
        });
    }

  };

  static battle = async (playerOne: number, playerTwo: number) => {
    const playerOneCard = await pokemonModel.findOne({ _id: playerOne });
    const playerTwoCard = await pokemonModel.findOne({ _id: playerTwo });

    let playerOneAttributeWin = 0;
    let playerTwoAttributeWin = 0;

    // compara os atributos das cartas

    if (playerOneCard.attributes.hp !== playerTwoCard.attributes.hp) {
      playerOneCard.attributes.hp > playerTwoCard.attributes.hp
        ? playerOneAttributeWin++
        : playerTwoAttributeWin++;
    }
    if (playerOneCard.attributes.attack !== playerTwoCard.attributes.attack) {
      playerOneCard.attributes.attack > playerTwoCard.attributes.attack
        ? playerOneAttributeWin++
        : playerTwoAttributeWin++;
    }
    if (playerOneCard.attributes.defense !== playerTwoCard.attributes.defense) {
      playerOneCard.attributes.defense > playerTwoCard.attributes.defense
        ? playerOneAttributeWin++
        : playerTwoAttributeWin++;
    }
    if (
      playerOneCard.attributes["special-attack"] !==
      playerTwoCard.attributes["special-attack"]
    ) {
      playerOneCard.attributes["special-attack"] >
        playerTwoCard.attributes["special-attack"]
        ? playerOneAttributeWin++
        : playerTwoAttributeWin++;
    }
    if (
      playerOneCard.attributes["special-defense"] !==
      playerTwoCard.attributes["special-defense"]
    ) {
      playerOneCard.attributes["special-defense"] >
        playerTwoCard.attributes["special-defense"]
        ? playerOneAttributeWin++
        : playerTwoAttributeWin++;
    }
    if (playerOneCard.attributes.speed !== playerTwoCard.attributes.speed) {
      playerOneCard.attributes.speed > playerTwoCard.attributes.speed
        ? playerOneAttributeWin++
        : playerTwoAttributeWin++;
    }
    // retona empate ou o jogador e a carta vencedora com os atributos
    console.log(playerOneAttributeWin, playerTwoAttributeWin);
    if (playerOneAttributeWin === playerTwoAttributeWin) return "Draw";
    return playerOneAttributeWin > playerTwoAttributeWin
      ? new ResultModel(1, 2, playerOneCard.name, playerOneCard.attributes)
      : new ResultModel(2, 1, playerTwoCard.name, playerTwoCard.attributes);
  };
}
