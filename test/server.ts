import express from "express";
import { BuildAPI } from "../src/decorators/Builder";
import { UserController } from "./controllers/UserController";
import bodyParser from "body-parser";
import { BitokuController } from "./controllers/BitokuController";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { router, apiUrl, docsUrl } = BuildAPI({
  controllers: [UserController, BitokuController],
  auth: () => {
    return true;
  },
});

app.use(router);

app.listen(5000, () => {
  console.log(`Server started on http://localhost:5000${apiUrl}`);
  console.log(`Doc started on http://localhost:5000${docsUrl}`);
});
