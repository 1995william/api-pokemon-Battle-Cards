import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";
import { ResultModel } from "../models/resultModel";
import { PokemonBattleStatsModel } from "../models/pokemonBattleStatsModel";
import { scoreModel } from "../models/dbBattleScore";
export class BattleController {
  static arena = async (req: Request, res: Response) => {
    const { playerOneCard, playerTwoCard } = req.body;

    if (!playerOneCard) return res.status(404).json({ "Player is required": "playerOneCard" });
    if (!playerTwoCard) return res.status(404).json({ "Player is required": "playerTwoCard" });

    try {
      const battleResult = await this.battle(playerOneCard, playerTwoCard);

      if (battleResult === "Draw") return res.status(200).json("Drawn battle");

      battleResult.playerWinner == 1 ?
        await scoreModel.updateOne({ $inc: { playerOneWins: +1 } }) :
        await scoreModel.updateOne({ $inc: { playerTwoWins: +1 } });

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

    // placar de estatísticas do pokemon vencedor
    let hpWinner = 0;
    let attackWinner = 0;
    let defenseWinner = 0;
    let specialAttackWinner = 0;
    let specialDefenseWinner = 0;
    let speedWinner = 0;

    // totaliza quantidade de atributos vencidos de cada jogador
    let playerOneTotalAttributeWin = 0;
    let playerTwoTotalAttributeWin = 0;

    // compara os atributos das cartas
    if (playerOneCard.attributes.hp !== playerTwoCard.attributes.hp) {
      playerOneCard.attributes.hp > playerTwoCard.attributes.hp
        ? (hpWinner = 1, playerOneTotalAttributeWin++)
        : (hpWinner = 2, playerTwoTotalAttributeWin++);
    }
    if (playerOneCard.attributes.attack !== playerTwoCard.attributes.attack) {
      playerOneCard.attributes.attack > playerTwoCard.attributes.attack
        ? (attackWinner = 1, playerOneTotalAttributeWin++)
        : (attackWinner = 2, playerTwoTotalAttributeWin++);
    }
    if (playerOneCard.attributes.defense !== playerTwoCard.attributes.defense) {
      playerOneCard.attributes.defense > playerTwoCard.attributes.defense
        ? (defenseWinner = 1, playerOneTotalAttributeWin++)
        : (defenseWinner = 2, playerTwoTotalAttributeWin++);
    }
    if (
      playerOneCard.attributes["special-attack"] !==
      playerTwoCard.attributes["special-attack"]
    ) {
      playerOneCard.attributes["special-attack"] >
        playerTwoCard.attributes["special-attack"]
        ? (specialAttackWinner = 1, playerOneTotalAttributeWin++)
        : (specialAttackWinner = 2, playerTwoTotalAttributeWin++)
    }
    if (
      playerOneCard.attributes["special-defense"] !==
      playerTwoCard.attributes["special-defense"]
    ) {
      playerOneCard.attributes["special-defense"] >
        playerTwoCard.attributes["special-defense"]
        ? (specialDefenseWinner = 1, playerOneTotalAttributeWin++)
        : (specialDefenseWinner = 2, playerTwoTotalAttributeWin++);
    }
    if (playerOneCard.attributes.speed !== playerTwoCard.attributes.speed) {
      playerOneCard.attributes.speed > playerTwoCard.attributes.speed
        ? (speedWinner = 1, playerOneTotalAttributeWin++)
        : (speedWinner = 2, playerTwoTotalAttributeWin++);
    }

    // aqui passa o resultado final das estatísticas do pokemon durante a batalha para o constructor
    const pokemonBattleStats = new PokemonBattleStatsModel(hpWinner, attackWinner, defenseWinner, specialAttackWinner, specialDefenseWinner, speedWinner);

    // retorna empate ou o jogador e a carta vencedora com os atributos
    if (playerOneTotalAttributeWin === playerTwoTotalAttributeWin) return "Draw";
    return playerOneTotalAttributeWin > playerTwoTotalAttributeWin
      ? new ResultModel(1, 2, playerOneCard.name, pokemonBattleStats)
      : new ResultModel(2, 1, playerTwoCard.name, pokemonBattleStats);
  };
}
