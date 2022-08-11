import mongoose, { Schema } from "mongoose";

const battleScoreSchema = new Schema(
    {
        "playerOneWins": { type: Number, default: 0 },
        "playerTwoWins": { type: Number, default: 0 },
    },
    { versionKey: false }
);

const scoreModel = mongoose.model("score", battleScoreSchema);

export { scoreModel };