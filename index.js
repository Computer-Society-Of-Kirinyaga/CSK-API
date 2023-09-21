import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/User.Routes.js";
import EventRoutes from "./src/routes/Event.Routes.js";
import adminRoutes from "./src/routes/Admin.Routes.js";
import libraryRoutes from "./src/routes/Library.Routes.js";
import LibraryFiles from "./src/controllers/LibraryFiles.Controller.js";
import EventFiles from "./src/controllers/EventFiles.Controller.js";

import {
  authMiddleware,
  rateLimiterMiddleware,
} from "./src/middlewares/Middlewares.js";

const app = express(); //express instance
//config cors & dotenv
app.use(cors());
dotenv.config();

// mongoose connection
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Custom middlewares
rateLimiterMiddleware(app);
authMiddleware(app);

// body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
userRoutes(app);
EventRoutes(app);
adminRoutes(app);
libraryRoutes(app);

app.use("/libraryUpload", LibraryFiles); //upload & delete library files
app.use("/eventUpload", EventFiles); //upload & delete library files

app.get("/", (req, res) => {
  res.send(`<h3>Hello😁 Welcome CSK API!</h3>`);
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
