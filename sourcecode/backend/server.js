require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Based Flashcard Application",
      version: "1.0.0",
      description:
        "AI based flashcard application, for Network Technologies classes",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const usersRouter = require("./routes/users");
const flashcardSetRouter = require("./routes/flashcardsets");
const flashcardRouter = require("./routes/flashcards");
const authRouter = require("./routes/auth");
const extractRouter = require("./routes/extract");

app.use("/users", usersRouter);
app.use("/flashcardSets", flashcardSetRouter);
app.use("/flashcards", flashcardRouter);
app.use("/auth", authRouter);
app.use("/extract", extractRouter);

app.listen(8000, () => console.log("Server Started"));
