const controller = require('../controllers/fournisseur.controller.js')

module.exports = function (app) {
  app.get('/api/fournisseurs/:id', controller.findOne)
  app.get('/api/fournisseurs/', controller.findAll)
  app.post('/api/fournisseurs/', controller.create)
  app.put('/api/fournisseurs/:id', controller.update)
  app.put('/api/fournisseurs/valider/:id', controller.valider)
  app.delete('/api/fournisseurs/', controller.deleteAll)
  app.delete('/api/fournisseurs/:id', controller.delete)
}
