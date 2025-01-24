require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AI Based Flashcard Application",
            version: "1.0.0",
            description: "AI based flashcard application, for Network Technologies classes",
        },
        servers: [
            {
                url: "http://localhost:3000", 
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

const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const flashcardSetRouter = require('./routes/flashcardsets');
app.use('/flashcardSets', flashcardSetRouter);

const flashcardRouter = require('./routes/flashcards');
app.use('/flashcards', flashcardRouter);

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

app.listen(3000, () => console.log('Server Started'));
