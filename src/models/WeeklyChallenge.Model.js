import mongoose from "mongoose";
const responseSchema = new mongoose.Schema({
  response: {
    type: String,
  },
  respondedBy: {
    type: String,
  },
  comment: {
    type: String,
    default: "", // Default to an empty string
  },
  rateResponse: {
    type: Number,
    default: 0,
    min: 0, // Minimum value allowed is 0
    max: 5, // Maximum value allowed is 5
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const weeklyChallengeSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    responses: [responseSchema],
    uploadedBy: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WeeklyChallengeModel = mongoose.model(
  "WeeklyChallenge",
  weeklyChallengeSchema
);

export default WeeklyChallengeModel;
