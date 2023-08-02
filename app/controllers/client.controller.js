const db = require('../models')
const Client = db.client
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.nationalite) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Client.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Client: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { nationalite } = req.query
  let condition = nationalite
    ? { nationalite: { [Op.like]: `%${nationalite}%` } }
    : null
  Client.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Clients.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Client.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Clients.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Client.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Client with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Client with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Client.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Client was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Client with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Client.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Client was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Client with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Client.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Clients were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Clients.',
      })
    })
}
