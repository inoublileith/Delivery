const controller = require('../controllers/admin.controller.js')

module.exports = function (app) {
  app.get('/api/admin/:id', controller.findOne)
  app.get('/api/admin/', controller.findAll)
  app.post('/api/admin/', controller.create)
  app.put('/api/admin/:id', controller.update)
  app.delete('/api/admin/', controller.deleteAll)
  app.delete('/api/admin/:id', controller.delete)
}
