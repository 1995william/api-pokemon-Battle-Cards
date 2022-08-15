import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../swagger.json"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

export { app };
