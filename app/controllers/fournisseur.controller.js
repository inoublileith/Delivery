const db = require('../models')
const Fournisseur = db.fournisseur
const User = db.utilisateur
const Op = db.Sequelize.Op
const sql = db.sequelize

exports.create = async (req, res) => {
  try {
    if (!req.body.MF) {
      res.status(400).send({
        message: 'Content can not be empty!',
      })
      return
    }
    Fournisseur.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Fournisseur: ${error}`)
  }
}

exports.findAll = async (req, res) => {
  User.findAll({ where: {
    profil: 2
  } })
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Fournisseurs.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Fournisseurs',
      })
    })
}

// exports.findAll = async (req, res) => {
//   const data = await sql
//     .query(
//       `SELECT fournisseurs.id, fournisseurs.etat, fournisseurs.entreprise, fournisseurs.MF, fournisseurs.RC, fournisseurs.adress_entreprise, fournisseurs.web_site, fournisseurs.page_facebook, utilisateurs.nom, utilisateurs.prenom, utilisateurs.email, utilisateurs.tel, utilisateurs.login, utilisateurs.password, utilisateurs.createdAt as date_ins FROM fournisseurs, utilisateurs where utilisateurs.id = fournisseurs.iduser`
//     )
//     .then((data) => {
//       console.log('data : ', data[0])
//       res.send(data[0])
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving Candidatures.',
//       })
//     })
// }

// exports.findAllPromoted = (req, res) => {
//   Fournisseur.findAndCountAll({ where: { promoted: 1 } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving promoted Fournisseurs.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id
  Fournisseur.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Fournisseur with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Fournisseur with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Fournisseur.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Fournisseur was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Fournisseur with id=${id}. Maybe Fournisseur was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Fournisseur with id=' + id,
      })
    })
}

exports.valider = (req, res) => {
  const id = req.params.id
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Fournisseur was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Fournisseur with id=${id}. Maybe Fournisseur was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Fournisseur with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Fournisseur.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Fournisseur was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Fournisseur with id=${id}. Maybe Fournisseur was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Fournisseur with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Fournisseur.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fournisseurs were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Fournisseurs.',
      })
    })
}
