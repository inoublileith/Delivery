const db = require('../models')
const Avis = db.avis
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.objet) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Avis.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Avis: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { objet } = req.query
  let condition = objet ? { objet: { [Op.like]: `%${objet}%` } } : null
  Avis.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Aviss.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Avis.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Aviss.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Avis.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Avis with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Avis with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Avis.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Avis was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Avis with id=${id}. Maybe Avis was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Avis with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Avis.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Avis was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Avis with id=${id}. Maybe Avis was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Avis with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Avis.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Aviss were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Aviss.',
      })
    })
}
