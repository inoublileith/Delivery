const controller = require('../controllers/participation.controller.js')

module.exports = function (app) {
  app.get('/api/participations/:id', controller.findOne)
  app.get('/api/participations/', controller.findAll)
  app.post('/api/participations/', controller.create)
  app.put('/api/participations/:id', controller.update)
  app.delete('/api/participations/', controller.deleteAll)
  app.delete('/api/participations/:id', controller.delete)

  app.get('/api/participations/user/:id', controller.findByiduser)

}
