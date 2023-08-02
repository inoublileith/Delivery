const controller = require('../controllers/evenement.controller.js')

module.exports = function (app) {
  app.get('/api/evenements/:id', controller.findOne)
  app.get('/api/evenements/', controller.findAll)
  app.post('/api/evenements/', controller.create)
  app.put('/api/evenements/:id', controller.update)
  app.delete('/api/evenements/', controller.deleteAll)
  app.delete('/api/evenements/:id', controller.delete)
}
