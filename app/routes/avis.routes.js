const controller = require('../controllers/avis.controller.js')

module.exports = function (app) {
  app.get('/api/avis/:id', controller.findOne)
  app.get('/api/avis/', controller.findAll)
  app.post('/api/avis/', controller.create)
  app.put('/api/avis/:id', controller.update)
  app.delete('/api/avis/', controller.deleteAll)
  app.delete('/api/avis/:id', controller.delete)
}
