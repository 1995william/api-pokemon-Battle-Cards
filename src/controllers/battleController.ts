import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";
import { ResultModel } from "../models/resultModel";
export class BattleController {
  static arena = async (req: Request, res: Response) => {
    const { playerOneCard, playerTwoCard } = req.body;
    
   const battleResult = await this.battle(playerOneCard,playerTwoCard);
    console.log(battleResult)
    res.status(200).json(battleResult);
};



static battle = async (playerOne: number, playerTwo: number) => {

    const playerOneCard = await pokemonModel.findOne({ _id: playerOne });
    const playerTwoCard = await pokemonModel.findOne({ _id: playerTwo });

    let playerOneAttributeWin = 0;
    let playerTwoAttributeWin = 0;

     // compara os atributos das cartas
    playerOneCard.attributes.hp > playerTwoCard.attributes.hp ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    playerOneCard.attributes.attack > playerTwoCard.attributes.attack ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    playerOneCard.attributes.defense > playerTwoCard.attributes.defense ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    playerOneCard.attributes["special-attack"] > playerTwoCard.attributes["special-attack"] ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    playerOneCard.attributes["special-defense"] > playerTwoCard.attributes["special-defense"] ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    playerOneCard.attributes.speed > playerTwoCard.attributes.speed ? playerOneAttributeWin++ : playerTwoAttributeWin++
    
    // retona o jogador vencedor e os atributos das cartas
    return playerOneAttributeWin > playerTwoAttributeWin ? 
    new ResultModel(1, 2, playerOneCard.attributes) :
    new ResultModel(2, 1, playerTwoCard.attributes)

  }


}
