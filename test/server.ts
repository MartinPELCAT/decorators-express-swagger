import express from "express";
import { BuildApi } from "../src/decorators/Builder";
import { HelloController } from "./controllers/HelloController";

const app = express();

const { router } = BuildApi({
  controllers: [HelloController],
});

app.use(router);

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
