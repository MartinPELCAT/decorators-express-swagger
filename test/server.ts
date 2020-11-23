import express from "express";
import { BuildAPI } from "../src/decorators/Builder";
import { HelloController } from "./controllers/HelloController";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { router } = BuildAPI({
  controllers: [HelloController],
  auth: () => {
    return true;
  },
});

app.use(router);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
