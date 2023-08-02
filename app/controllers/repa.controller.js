const db = require('../models')
const Repa = db.repa
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.titre) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Repa.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Repa: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { iduser } = req.query
  let condition = iduser ? { iduser: { [Op.like]: `%${iduser}%` } } : null
  Repa.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Repas.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Repa.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Repas.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Repa.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Repa with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Repa with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Repa.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Repa was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Repa with id=${id}. Maybe Repa was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Repa with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Repa.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Repa was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Repa with id=${id}. Maybe Repa was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Repa with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Repa.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Repas were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Repas.',
      })
    })
}
