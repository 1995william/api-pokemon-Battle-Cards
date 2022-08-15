import { Request, Response } from "express";
import { scoreModel } from "../models/dbBattleScore";

export class ScoreController {
    static scoreTotal = async (req: Request, res: Response) => {
        try {
            const playersScore = await scoreModel.find();
            const [{playerOneWins, playerTwoWins}] = playersScore;

            res.status(200).json({"playerOneWins": playerOneWins, "playerTwoWins": playerTwoWins});
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
    static reset = async (req: Request, res: Response) => {
  
        try {
            const playersScore = await scoreModel.find();
            if(playersScore[0] === undefined) await scoreModel.create({playerOneWins:0, playerTwoWins:0});
            
            await scoreModel.updateOne({ playerOneWins: 0 });
            await scoreModel.updateOne({ playerTwoWins: 0 }); 
            res.status(200).json("score reseted");
        } catch (error) {
            res.status(404).json(error.message);
        }

    }
  
}