const db = require('../models')
const Admin = db.admin
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    if (!req.body.nom_application) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Admin.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Admin: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { nom_application } = req.query
  let condition = nom_application
    ? { nom_application: { [Op.like]: `%${nom_application}%` } }
    : null
  Admin.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Admins.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Admin.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Admins.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Admin.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Admin with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Admin with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Admin.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Admin was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Admin with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Admin.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Admin was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Admin with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Admin.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Admins were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Admins.',
      })
    })
}
