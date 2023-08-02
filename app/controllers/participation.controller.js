const db = require('../models')
const Participation = db.participation
const Op = db.Sequelize.Op
const sql = db.sequelize

exports.create = async (req, res) => {
  try {
    if (!req.body.iduser || !req.body.idevenement) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Participation.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Participation: ${error}`)
  }
}

exports.findAll = (req, res) => {
  const { numero_place } = req.query
  let condition = numero_place ? { numero_place: { [Op.like]: `%${numero_place}%` } } : null
  Participation.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Participations.',
      })
    })
}

// exports.findAllPromoted = (req, res) => {
//   Participation.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Participations.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Participation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Participation with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Participation with id=' + id,
      })
    })
}


exports.findByiduser = async (req, res) => {
  const id = req.params.id

  const data = await sql
    .query(
      `SELECT participations.id, evenements.libelle, evenements.lieu, evenements.description, evenements.prix, evenements.date_debut, evenements.date_fin, participations.numero_place FROM evenements, participations WHERE participations.idevenement = evenements.id AND participations.iduser=${id}`
    )
    .then((data) => {
      console.log('data : ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving.',
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Participation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Participation was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Participation with id=${id}. Maybe Participation was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Participation with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Participation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Participation was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Participation with id=${id}. Maybe Participation was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Participation with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Participation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Participations were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Participations.',
      })
    })
}
