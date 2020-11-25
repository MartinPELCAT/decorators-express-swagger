import { Router } from "express";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { join } from "path";

export const generateApiDoc = (router: Router, docUrl: string) => {
  const apiStorage = getAPIMetadataStorage();
  router.get(docUrl, (_req, res) => {
    res.render(join(__dirname, "./views/index.pug"), {
      controllers: apiStorage.controllers.sort((a, b) =>
        a.target.name.localeCompare(b.target.name)
      ),
    });
  });

  router.get(docUrl.concat("/controller/:name"), () => {});

  router.get(docUrl.concat("/type/:name"), (req, res) => {
    const type = apiStorage.types.find((typ) => req.params.name === typ.name);
    console.log(type);
    res.render("./views/index.pug");
  });
};
