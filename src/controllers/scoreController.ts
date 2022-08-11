import { Request, Response } from "express";
import { resultsModel } from "../models/dbBattleScore";

export class ScoreController {
    static scoreTotal = async (req: Request, res: Response) => {
        try {
            const playersScore = await resultsModel.find();

            res.status(200).json(playersScore);
        } catch (error) {
            res.status(404).json(error.message)
        }

    }
}