const db = require('../models')
const Evenement = db.evenement
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.libelle) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Evenement.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Evenement: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { iduser } = req.query
  let condition = iduser ? { iduser: { [Op.like]: `%${iduser}%` } } : null
  Evenement.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Evenements.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Evenement.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Evenements.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Evenement.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Evenement with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Evenement with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Evenement.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Evenement was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Evenement with id=${id}. Maybe Evenement was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Evenement with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Evenement.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Evenement was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Evenement with id=${id}. Maybe Evenement was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Evenement with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Evenement.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Evenements were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Evenements.',
      })
    })
}
