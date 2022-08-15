import Validator from "fastest-validator";
import { IplayerCard } from "../types/playersCard";

export const playersCardChoice: IplayerCard = (playerOneCard, playerTwoCard) => {
    const data = {
        playerOneCard: playerOneCard,
        playerTwoCard: playerTwoCard
    }
    const schema = {
        playerOneCard: { type: "number", optional: false },
        playerTwoCard: { type: "number", optional: false },
   
    };
    const validator = new Validator();

    return validator.validate(data, schema)
}