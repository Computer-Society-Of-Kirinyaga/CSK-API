import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { authMiddleware, rateLimiterMiddleware } from "./src/middlewares/Middlewares.js"

import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Swagger setup
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "University API",
            description: "University API Information",
            contact: {
                name: "CSK API",
                url: "https://github.com/Computer-Society-Of-Kirinyaga/CSK-API",
            },
            version: "1.0.0"
        },
        servers: [{ url: `${process.env.DeployedDomain}` }]
    },
    apis: ["./src/routes/*.js"]
};
const specs = swaggerJSDoc(options);


dotenv.config();
const app = express();
app.use(cors());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// mongoose connection
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error connecting to MongoDB", err);
});

// Custom middlewares
authMiddleware(app);
rateLimiterMiddleware(app);

// body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes


app.get("/", (req, res) => {
    let webpage = ` <div> <h3>Hello😁 Welcome CSK API!</h3>
    <p>👉🏽 <a href= ${process.env.LocalDomain}/api-docs/>Visit CSK API Docs</a> </p>
    </div> `;
    res.send(webpage);
})

//Docs in JSON format
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
});

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
