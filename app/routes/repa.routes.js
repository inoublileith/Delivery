const controller = require('../controllers/repa.controller.js')

module.exports = function (app) {
  app.get('/api/repas/:id', controller.findOne)
  app.get('/api/repas/', controller.findAll)
  app.post('/api/repas/', controller.create)
  app.put('/api/repas/:id', controller.update)
  app.delete('/api/repas/', controller.deleteAll)
  app.delete('/api/repas/:id', controller.delete)
}
