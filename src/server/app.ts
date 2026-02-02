import "dotenv/config";
import express from "express";
import morgan from "morgan";
import checkHealthStatus from "../middleware/checkHealthStatus/checkHealthStatus.js";
import handleErrors from "../middleware/handleError/handleErrors.js";
import handleEndpointNotFound from "../middleware/handleEndpointNotFound/handleEndpointNotFound.js";
import authRouter from "../auth/router/authRouter.js";
import handleCors from "../middleware/handleCors/handleCors.js";
import filamentRouter from "../filaments/router/filamentRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(handleCors);

app.use(express.json());

app.get("/", checkHealthStatus);

app.use("/auth", authRouter);

app.use("/stockfilaments", filamentRouter);

app.use(handleEndpointNotFound);

app.use(handleErrors);

export default app;
