import dotenv from "dotenv";
dotenv.config({ path: [`.env.${process.env.NODE_ENV}`, ".env"] });
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import ErrorMiddleware from "@middleware/ErrorMiddleware";
import corsOptions from "@config/cors";
import logs from "@config/log";
import { registerRoutes } from "@lib/Decorators";

const app = express();
app.use(logs);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use("/public", express.static(__dirname + "/storage"));
registerRoutes(app).then(() => {
  
});
app.use(ErrorMiddleware);

//disable when create migrate
// migrate();

app.listen(process.env.PORT, () => {
  const msg = `server has running in port :${process.env.PORT} on ${process.env.NODE_ENV} mode.`;
  console.log(msg);
});
