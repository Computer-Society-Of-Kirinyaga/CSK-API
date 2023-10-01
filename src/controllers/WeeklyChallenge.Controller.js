import WeeklyChallengeModel from "../models/WeeklyChallenge.Model.js";
import {
  handleWeeklyChallengeExists,
  handleWeeklyChallengeNotFound,
  tryCatchWrapper,
} from "../factory/Factory.js";
import { formatDate } from "../helperFunctions/HelperFunctions.js";

export const createWeeklyChallenge = async (req, res) => {
  const handler = async (req, res) => {
    const { topic, question, techStack, uploadedBy, responses = [] } = req.body;
    const existingWeeklyChallenge = await WeeklyChallengeModel.findOne({
      $or: [{ topic: topic }, { question: question }],
    });
    if (existingWeeklyChallenge) {
      handleWeeklyChallengeExists(res);
      return;
    }
    const weeklyChallengeRes = await WeeklyChallengeModel.create({
      topic,
      question,
      techStack,
      uploadedBy,
      responses,
    });
    res.status(201).json(weeklyChallengeRes);
  };
  tryCatchWrapper(handler, req, res);
};
export const getWeeklyChallenges = async (req, res) => {
  const handler = async (req, res) => {
    const results = await WeeklyChallengeModel.find();
    res.status(200).json(results);
  };
  tryCatchWrapper(handler, req, res);
};
export const getWeeklyChallengesGroupedByTechStack = async (req, res) => {
  const handler = async (req, res) => {
    const results = await WeeklyChallengeModel.aggregate([
      {
        $group: {
          _id: "$techStack",
          questions: {
            $push: {
              topic: "$topic",
              question: "$question",
              uploadedBy: "$uploadedBy",
              uploadDate: "$createdAt",
            },
          },
        },
      },
    ]);
    res.status(200).json(results);
  };
  tryCatchWrapper(handler, req, res);
};

export const getWeeklyChallenge = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    const weeklyChallenge = await WeeklyChallengeModel.findById(id);
    if (!weeklyChallenge) {
      handleWeeklyChallengeNotFound(res);
      return;
    }
    res.status(200).json(weeklyChallenge);
  };
  tryCatchWrapper(handler, req, res);
};
export const updateWeeklyChallenge = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    const { topic, question, techStack, uploadedBy } = req.body;
    const weeklyChallenge = await WeeklyChallengeModel.findById(id);
    if (!weeklyChallenge) {
      handleWeeklyChallengeNotFound(res);
      return;
    }
    if (!topic && !question && !techStack && !uploadedBy) {
      handleValidationError(
        {
          details: [
            {
              message: "At least one weeklyChallenge property must be updated",
            },
          ],
        },
        res
      );
    }

    topic && (weeklyChallenge.topic = topic);
    question && (weeklyChallenge.question = question);
    techStack && (weeklyChallenge.techStack = techStack);
    uploadedBy && (weeklyChallenge.uploadedBy = uploadedBy);

    await weeklyChallenge.save();
    res.status(200).json(weeklyChallenge);
  };
  tryCatchWrapper(handler, req, res);
};
export const deleteWeeklyChallenge = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    const weeklyChallenge = await WeeklyChallengeModel.findByIdAndDelete(id);
    if (!weeklyChallenge) {
      handleWeeklyChallengeNotFound(res);
      return;
    }
    res.status(200).json({ message: "Weekly Challenge deleted successfully" });
  };
  tryCatchWrapper(handler, req, res);
};

//user answering weekly challenge
export const createResponse = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    const { userAnswer, userName } = req.body;

    const weeklyChallenge = await WeeklyChallengeModel.findById(id);
    if (!weeklyChallenge) {
      handleWeeklyChallengeNotFound(res);
      return;
    }
    if (!userAnswer && !userName) {
      handleValidationError(
        {
          details: [
            {
              message: "At least one property must be updated",
            },
          ],
        },
        res
      );
      return;
    }
    weeklyChallenge.responses.push({
      respondedBy: userName,
      response: userAnswer,
      rateResponse: 0,
      comment: "",
    });

    await weeklyChallenge.save();
    res.status(201).json(weeklyChallenge);
  };
  tryCatchWrapper(handler, req, res);
};
