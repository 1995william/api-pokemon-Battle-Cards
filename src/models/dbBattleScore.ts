import mongoose, { Schema } from "mongoose";

const battleScoreSchema = new Schema(
    {
        "playerOneWins": { type: Number, default: 0 },
        "playerTwoWins": { type: Number, default: 0 },
    },
    { versionKey: false }
);

const resultsModel = mongoose.model("results", battleScoreSchema);

export { resultsModel };