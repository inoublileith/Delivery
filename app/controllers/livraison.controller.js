const db = require('../models')
const Livraison = db.livraison
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.titre) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Livraison.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Livraison: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { titre } = req.query
  let condition = titre ? { titre: { [Op.like]: `%${titre}%` } } : null
  Livraison.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Livraisons.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Livraison.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Livraisons.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Livraison.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Livraison with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Livraison with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Livraison.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Livraison was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Livraison with id=${id}. Maybe Livraison was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Livraison with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Livraison.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Livraison was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Livraison with id=${id}. Maybe Livraison was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Livraison with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Livraison.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Livraisons were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Livraisons.',
      })
    })
}
