import { Router } from "express";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { join } from "path";

export const generateApiDoc = (router: Router, docUrl: string) => {
  const apiStorage = getAPIMetadataStorage();

  router.get(docUrl, (_req, res) => {
    const controllers = apiStorage.controllers.sort((a, b) =>
      a.target.name.localeCompare(b.target.name)
    );

    if (controllers) {
      res.render(join(__dirname, "./views/index.pug"), {
        controllers,
        docUrl,
      });
    } else {
      res.status(404).send("Aucun controller trouver");
    }
  });

  router.get(docUrl.concat("/controller/:name"), (req, res) => {
    const controller = apiStorage.controllers.find(
      (controller) => controller.target.name === req.params.name
    );
    if (controller) {
      res.render(join(__dirname, "./views/controller.pug"), {
        controller,
        docUrl,
      });
    } else {
      res.status(404).send("Ce controller n'existe pas");
    }
  });

  router.get(
    docUrl.concat("/controller/:name").concat("/:route"),
    (req, res) => {
      const route = apiStorage.controllers
        .find((controller) => controller.target.name === req.params.name)
        .routes.find((route) => route.key === req.params.route);
      if (route) {
        res.render(join(__dirname, "./views/route.pug"), {
          route,
          docUrl,
        });
      } else {
        res.status(404).send("Cette route n'existe pas dans ce controller");
      }
    }
  );

  router.get(docUrl.concat("/type/:name"), (req, res) => {
    const type = apiStorage.types.find((typ) => req.params.name === typ.name);
    if (type) {
      res.render(join(__dirname, "./views/type.pug"), { type });
    } else {
      res.status(404).send("Ce Type n'existe pas");
    }
  });
};
