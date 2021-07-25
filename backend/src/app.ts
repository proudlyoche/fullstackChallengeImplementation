import express, { Express, json } from "express";
import config from "./config";
import cors from "cors";
import boom from "express-boom";
import { connect } from "mongoose";
import { userRouter } from "./user";
import swaggerJsDoc from "swagger-jsdoc";
import {serve, setup} from "swagger-ui-express";

const app: Express = express();

app.use(json());
app.use(cors());
app.use(boom());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Code Challenge API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["src/docs/**/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", serve, setup(swaggerDocs));

connect(config.db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database is linked and running.");
});

app.use("/api", userRouter);

app.listen(config.port, () => {
  console.log(
    `Server running on http://127.0.0.1:${config.port} | https://localhost:${config.port}`
  );
});
