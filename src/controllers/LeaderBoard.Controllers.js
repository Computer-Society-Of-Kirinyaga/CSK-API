export const getTop5StudentsPerQuestionWeeklyForAllQuestions = async (
  req,
  res
) => {
  const handler = async (req, res) => {
    try {
      const lastWeekStartDate = new Date(new Date() - 7 * 24 * 60 * 60 * 1000); // Calculate the start date for the last week

      const results = await LeaderBoardModel.aggregate([
        {
          $unwind: "$weeklyHighScores",
        },
        {
          $match: {
            "weeklyHighScores.uploadedWhen": {
              $gte: lastWeekStartDate, // Filter for scores from the last week
            },
          },
        },
        {
          $group: {
            _id: {
              question: "$weeklyHighScores.question",
              user: "$weeklyHighScores.user",
            },
            totalScore: { $sum: "$weeklyHighScores.score" },
          },
        },
        {
          $sort: { "_id.question": 1, totalScore: -1 },
        },
        {
          $group: {
            _id: "$_id.question",
            topStudents: {
              $push: { user: "$_id.user", totalScore: "$totalScore" },
            },
          },
        },
        {
          $project: {
            question: "$_id",
            topStudents: { $slice: ["$topStudents", 5] }, // Get the top 5 students for each question
          },
        },
      ]);

      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res
          .status(404)
          .json({ message: "No top students found for the last week." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  handler(req, res);
};

export const getTop5AverageScoreStudentsInMonth = async (req, res) => {
  const handler = async (req, res) => {
    try {
      const results = await LeaderBoardModel.aggregate([
        {
          $unwind: "$monthlyHighScores",
        },
        {
          $match: {
            "monthlyHighScores.uploadedWhen": {
              $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // Filter for scores from the past month
            },
          },
        },
        {
          $group: {
            _id: "$monthlyHighScores.user",
            averageScore: { $avg: "$monthlyHighScores.score" },
          },
        },
        {
          $sort: { averageScore: -1 },
        },
        {
          $limit: 5,
        },
      ]);

      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res
          .status(404)
          .json({ message: "No top students found for the specified month." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  handler(req, res);
};

export const getTop5StudentsPerQuestionWeekly = async (req, res) => {
  const questionId = "<your_question_id>"; // Replace with the specific question ID you want to query

  const handler = async (req, res) => {
    try {
      const results = await LeaderBoardModel.aggregate([
        {
          $unwind: "$weeklyHighScores",
        },
        {
          $match: {
            "weeklyHighScores.question": questionId,
            "weeklyHighScores.uploadedWhen": {
              $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // Filter for scores from the past week
            },
          },
        },
        {
          $group: {
            _id: "$weeklyHighScores.user",
            totalScore: { $sum: "$weeklyHighScores.score" },
          },
        },
        {
          $sort: { totalScore: -1 },
        },
        {
          $limit: 5,
        },
      ]);

      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "No top students found for the specified question.",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  handler(req, res);
};
