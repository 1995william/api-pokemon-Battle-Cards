import { Request, Response } from "express";
import { pokemonModel } from "../models/dbPokemonModel";

export class BattleController {
  static arena = (req: Request, res: Response) => {
    const { playerOneCard, playerTwoCard } = req.body;
    
    this.battle(playerOneCard,playerTwoCard);

    res.status(200).json("battle");
};



static battle = async (playerOne: number, playerTwo: number) => {

    const cardOne = await pokemonModel.findOne({ _id: playerOne });
    const cardTwo = await pokemonModel.findOne({ _id: playerTwo });

    let playerOneAttributeWin = 0;
    let playerTwoAttributeWin = 0;
     
    cardOne.attributes.hp > cardTwo.attributes.hp ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    cardOne.attributes.attack > cardTwo.attributes.attack ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    cardOne.attributes.defense > cardTwo.attributes.defense ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    cardOne.attributes["special-attack"] > cardTwo.attributes["special-attack"] ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    cardOne.attributes["special-defense"] > cardTwo.attributes["special-defense"] ? playerOneAttributeWin++ : playerTwoAttributeWin++     
    cardOne.attributes.speed > cardTwo.attributes.speed ? playerOneAttributeWin++ : playerTwoAttributeWin++

   console.log({"player 1": playerOneAttributeWin, "player 2": playerTwoAttributeWin})

  }


}
