import express from "express";
import { BuildAPI } from "../src/decorators/Builder";
import { HelloController } from "./controllers/HelloController";

const app = express();

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
