const db = require('../models')
const Utilisateur = db.utilisateur
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.login) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Utilisateur.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Utilisateur: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { login } = req.query
  let condition = login ? { login: { [Op.like]: `%${login}%` } } : null
  Utilisateur.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Utilisateurs.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Utilisateur.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Utilisateurs.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Utilisateur.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Utilisateur with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Utilisateur with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Utilisateur.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Utilisateur was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Utilisateur with id=${id}. Maybe Utilisateur was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Utilisateur with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Utilisateur.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Utilisateur was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Utilisateur with id=${id}. Maybe Utilisateur was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Utilisateur with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Utilisateur.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Utilisateurs were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Utilisateurs.',
      })
    })
}
