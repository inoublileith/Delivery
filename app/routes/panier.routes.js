const controller = require("../controllers/panier.controller.js");
module.exports = function (app) {
  app.get("/api/paniers/:id", controller.findOne);
  app.get("/api/paniers/", controller.findAll);
  app.post("/api/paniers/", controller.create);
  app.put("/api/paniers/:id", controller.update);
  app.delete("/api/paniers/", controller.deleteAll);
  app.delete("/api/paniers/:id", controller.delete);

  app.get("/api/paniers/current/:id", controller.findPanier);

  app.post("/api/paniers/addlc", controller.createLc);

  app.get("/api/paniers/alllc/:id", controller.findAllLc);

  app.get("/api/paniers/getlp/:id", controller.getlp);
  app.get("/api/paniers/getlr/:id", controller.getlr);

  app.delete("/api/paniers/deletelc/:id", controller.deleteLc);

  app.delete("/api/paniers/deletealllc/:id", controller.deleteAllLc);

  app.put("/api/paniers/livrer/:id", controller.livrer);
};
