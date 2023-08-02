const controller = require('../controllers/livraison.controller.js')

module.exports = function (app) {
  app.get('/api/livraisons/:id', controller.findOne)
  app.get('/api/livraisons/', controller.findAll)
  app.post('/api/livraisons/', controller.create)
  app.put('/api/livraisons/:id', controller.update)
  app.delete('/api/livraisons/', controller.deleteAll)
  app.delete('/api/livraisons/:id', controller.delete)
}
