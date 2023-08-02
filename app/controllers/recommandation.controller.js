const Recommandation = require('../models/recommandation.model.js')
// Create and Save a new recommandation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  // Create a recommandation
  const recommandation = new Recommandation({
    titre: req.body.titre,
    description: req.body.description,
    domaine: req.body.domaine,
    specification: req.body.specification,
    retenu: req.body.retenu || 0,
    etat: req.body.etat || 0,
    date_ins: req.body.date_ins || Date.now(),
  })
  // Save Recommandation in the database
  Recommandation.create(recommandation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Recommandation.',
      })
    else res.send(data)
  })
}
// Retrieve all recommandations from the database (with condition).
exports.findAll = (req, res) => {
   const titre = req.query.titre
   Recommandation.getAll(titre, (err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message ||
           'Some error occurred while retrieving recommandations.',
       })
     else res.send(data)
   })
}
// Find a single recommandation with a id
exports.findOne = (req, res) => {
 Recommandation.findById(req.params.id, (err, data) => {
   if (err) {
     if (err.kind === 'not_found') {
       res.status(404).send({
         message: `Not found Recommandation with id ${req.params.id}.`,
       })
     } else {
       res.status(500).send({
         message: 'Error retrieving Recommandation with id ' + req.params.id,
       })
     }
   } else res.send(data)
 })
}
// find all published recommandations
exports.findAllPublished = (req, res) => {
  Recommandation.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving recommandations.',
      })
    else res.send(data)
  })
}
// Update a recommandation identified by the id in the request
exports.update = (req, res) => {
 if (!req.body) {
   res.status(400).send({
     message: 'Content can not be empty!',
   })
 }
 console.log(req.body)
 Recommandation.updateById(req.params.id, new Recommandation(req.body), (err, data) => {
   if (err) {
     if (err.kind === 'not_found') {
       res.status(404).send({
         message: `Not found Recommandation with id ${req.params.id}.`,
       })
     } else {
       res.status(500).send({
         message: 'Error updating Recommandation with id ' + req.params.id,
       })
     }
   } else res.send(data)
 })
}
// Delete a recommandation with the specified id in the request
exports.delete = (req, res) => {
  Recommandation.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Recommandation with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Recommandation with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Recommandation was deleted successfully!` })
  })
}
// Delete all recommandations from the database.
exports.deleteAll = (req, res) => {
  Recommandation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all recommandations.',
      })
    else res.send({ message: `All Recommandations were deleted successfully!` })
  })
}
