const controller = require('../controllers/utilisateur.controller.js')

module.exports = function (app) {
  app.get('/api/utilisateurs/:id', controller.findOne)
  app.get('/api/utilisateurs/', controller.findAll)
  app.post('/api/utilisateurs/', controller.create)
  app.put('/api/utilisateurs/:id', controller.update)
  app.delete('/api/utilisateurs/', controller.deleteAll)
  app.delete('/api/utilisateurs/:id', controller.delete)
}
