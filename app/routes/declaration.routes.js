const controller = require("../controllers/declaration.controller.js");
module.exports = function (app) {
  app.get("/api/declarations/:id", controller.findOne);
  app.get("/api/declarations/", controller.findAll);
  app.post("/api/declarations/", controller.create);
  app.put("/api/declarations/:id", controller.update);
  app.delete("/api/declarations/", controller.deleteAll);
  app.delete("/api/declarations/:id", controller.delete);
};
