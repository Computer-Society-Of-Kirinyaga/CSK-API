import {
  createWeeklyChallenge,
  getWeeklyChallenges,
  getWeeklyChallenge,
  updateWeeklyChallenge,
  deleteWeeklyChallenge,
  getWeeklyChallengesGroupedByTechStack,
  createResponse,
} from "../controllers/WeeklyChallenge.Controller.js";

const weeklyChallengeRoutes = (app) => {
  app.post("/weeklychallenge", createWeeklyChallenge);
  app.get("/weeklychallenge", getWeeklyChallenges);
  app.get("/weeklychallenge/:id", getWeeklyChallenge);
  app.get(
    "/weeklychallenge-groupedbytechstack",
    getWeeklyChallengesGroupedByTechStack
  );
  app.patch("/weeklychallenge/:id", updateWeeklyChallenge);
  app.delete("/weeklychallenge/:id", deleteWeeklyChallenge);

  //user answering weekly challenge

  app.post("/weeklychallenge-createResponse/:id", createResponse);
};
export default weeklyChallengeRoutes;
