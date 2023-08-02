const router = require('express').Router()

const recommandations = require('../controllers/recommandation.controller.js')

// Create a new recommandation
router.post('/', recommandations.create)

// Retrieve all recommandations
router.get('/', recommandations.findAll)

// Retrieve all published recommandations
router.get('/published', recommandations.findAllPublished)

// Retrieve a single recommandation with id
router.get('/:id', recommandations.findOne)

// Update a recommandation with id
router.put('/:id', recommandations.update)

// Delete a recommandation with id
router.delete('/:id', recommandations.delete)

// Delete all recommandations
router.delete('/', recommandations.deleteAll)

module.exports = router
