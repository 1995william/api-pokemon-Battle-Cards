import Validator from "fastest-validator";
import { Ipokemon } from "../types/registerPokemon";

export const cardPokemon = (reqBody: Ipokemon) => {

    const schema = {
        _id: { type: "number", optional: false },
        name: { type: "string", optional: false },
        attributes: {
            type: "object",
            props: {
                hp: { type: "number", optional: false },
                attack: { type: "number", optional: false },
                defense: { type: "number", optional: false },
                "special-attack": { type: "number", optional: false },
                "special-defense": { type: "number", optional: false },
                "speed": { type: "number", optional: false },
            },
            optional: false
        }

    };
    const validator = new Validator();

    return validator.validate(reqBody, schema)
}