const db = require('../models')
const Produit = db.produit
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.titre) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Produit.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Produit: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { iduser } = req.query
  let condition = iduser ? { iduser: { [Op.like]: `%${iduser}%` } } : null
  Produit.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Produits.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Produit.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Produit with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Produit with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Produit.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Produit was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Produit with id=${id}. Maybe Produit was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Produit with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Produit.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Produit was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Produit with id=${id}. Maybe Produit was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Produit with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Produit.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Produits were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Produits.',
      })
    })
}
