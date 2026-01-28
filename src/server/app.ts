import express from "express";
import morgan from "morgan";
import checkHealthStatus from "../middleware/checkHealthStatus/checkHealthStatus.js";
import handleErrors from "../middleware/handleError/handleErrors.js";
import handleEndpointNotFound from "../middleware/handleEndpointNotFound/handleEndpointNotFound.js";

const app = express();

app.use(morgan("dev"));

app.get("/", checkHealthStatus);

app.use(handleEndpointNotFound);

app.use(handleErrors);

export default app;
