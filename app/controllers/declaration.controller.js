const db = require('../models')
const Declaration = db.declaration
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.description) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Declaration.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Declaration: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { objet } = req.query
  let condition = objet ? { objet: { [Op.like]: `%${objet}%` } } : null
  Declaration.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Declarations.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Declaration.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Declarations.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Declaration.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Declaration with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Declaration with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Declaration.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Declaration was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Declaration with id=${id}. Maybe Declaration was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Declaration with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Declaration.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Declaration was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Declaration with id=${id}. Maybe Declaration was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Declaration with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Declaration.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Declarations were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Declarations.',
      })
    })
}
