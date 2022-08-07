import mongoose, { Schema } from "mongoose";

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  attributes: {
    type: {
      hp: Number,
      attack: Number,
      defense: Number,
      "special-attack": Number,
      "special-defense": Number,
      speed: Number,
    },
    required: true,
  }
}, { versionKey:false});

const pokemonModel = mongoose.model("pokemon", pokemonSchema);

export { pokemonModel };
