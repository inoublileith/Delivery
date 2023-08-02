const controller = require('../controllers/client.controller.js')

module.exports = function (app) {
  app.get('/api/clients/:id', controller.findOne)
  app.get('/api/clients/', controller.findAll)
  app.post('/api/clients/', controller.create)
  app.put('/api/clients/:id', controller.update)
  app.delete('/api/clients/', controller.deleteAll)
  app.delete('/api/clients/:id', controller.delete)
}
