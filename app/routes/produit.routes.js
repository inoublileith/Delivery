const controller = require('../controllers/produit.controller.js')

module.exports = function (app) {
  app.get("/api/produits/:id", controller.findOne);
  app.get("/api/produits/", controller.findAll);
  app.post("/api/produits/", controller.create);
  app.put("/api/produits/:id", controller.update);
  app.delete("/api/produits/", controller.deleteAll);
  app.delete("/api/produits/:id", controller.delete); 
}