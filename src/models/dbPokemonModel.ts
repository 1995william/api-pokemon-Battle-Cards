import mongoose, { Schema } from "mongoose";

const pokemonSchema = new Schema(
  {
    _id: {type: Number, require: true},
    name: { type: String, required: true },
    attributes: {
      type: {
        hp: { type: Number, required: true },
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        "special-attack": { type: Number, required: true },
        "special-defense": { type: Number, required: true },
        speed: { type: Number, required: true },
        _id: false
      },
      required: true,
    },
  },
  { versionKey: false }
);

const pokemonModel = mongoose.model("pokemon", pokemonSchema);

export { pokemonModel };
