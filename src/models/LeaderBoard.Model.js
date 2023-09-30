import mongoose from "mongoose";

const leaderBoardSchema = new mongoose.Schema(
  {
    weeklyHighScores: [
      {
        question: {
          type: String,
          required: true,
        },
        user: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        uploadedWhen: {
          type: Date,
          required: true,
        },
      },
    ],
    monthlyHighScores: [
      {
        user: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        uploadedWhen: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const LeaderBoardModel = mongoose.model("LeaderBoard", leaderBoardSchema);

export default LeaderBoardModel;
