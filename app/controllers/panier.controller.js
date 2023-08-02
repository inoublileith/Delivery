const db = require('../models')
const Panier = db.panier
const Op = db.Sequelize.Op
const Lc = db.lc

const sql = db.sequelize

exports.create = async (req, res) => {
  try {
    Panier.create(req.body).then((data) => {
      return res.send(data)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying creating Panier: ${error}`)
  }
}
// Retrieve all categories from the database
exports.findAll = (req, res) => {
  const { titre } = req.query
  let condition = titre ? { titre: { [Op.like]: `%${titre}%` } } : null
  Panier.findAll({ where: condition })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Paniers.',
      })
    })
}
// Find a single categorie with a id
exports.findOne = (req, res) => {
  const id = req.params.id
  Panier.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Panier with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Panier with id=' + id,
      })
    })
}
// Update a categorie identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id
  Panier.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Panier was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Panier with id=${id}. Maybe Panier was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Panier with id=' + id,
      })
    })
}
// Delete a categorie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Panier.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Panier was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Panier with id=${id}. Maybe Panier was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Panier with id=' + id,
      })
    })
}
// Delete all categories from the database.
exports.deleteAll = (req, res) => {
  Panier.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Paniers were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Paniers.',
      })
    })
}

//////// panier
exports.findPanier = (req, res) => {
  const id = req.params.id

  Panier.findOne({
    where: { iduser: id, etat: `0` },
  })
    .then((panier) => {
      if (panier) {
        res.send(panier)
      } else {
        res.status(404).send({
          message: `Cannot find paniers.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving paniers',
      })
    })
}

exports.createLc = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  // Save LcP in the database
  Lc.create({
    quantite: req.body.quantite,
    prId: req.body.prId,
    panierId: req.body.panierId,
    type: req.body.type,
    etat: 0,
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving paniers',
      })
    })
}

// Retrieve all categories from the database (with condition).
exports.findAllLc = async (req, res) => {
  const id = req.params.id
  const dataproduits = await sql
    .query(
      `SELECT lcs.id as idligne, lcs.etat, produits.titre, produits.prix, lcs.quantite, lcs.type FROM produits, lcs where lcs.prId = produits.id and lcs.type = 1 and lcs.panierId = ${id}`
    )
    .then((dataproduits) => {
      console.log('dataproduits : ', dataproduits[0])
      let dp = dataproduits[0]
      const datarepas = sql
        .query(
          `SELECT lcs.id as idligne, lcs.etat, repas.titre, repas.prix, lcs.quantite, lcs.type FROM repas, lcs where lcs.prId = repas.id and lcs.type = 2 and lcs.panierId =${id}`
        )
        .then((datarepas) => {
          console.log('datarepas : ', datarepas[0])
          let dr = datarepas[0]
          let data = { dp, dr }
          res.send(data)
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving panier.',
          })
        })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving panier.',
      })
    })
}
exports.getlp = async (req, res) => {
  const iduser = req.params.id
  const data = await sql
    .query(
      `SELECT lcs.id, lcs.panierId, lcs.etat, lcs.quantite, lcs.type, produits.titre, utilisateurs.id as iduser,utilisateurs.nom, utilisateurs.prenom, utilisateurs.tel from lcs ,paniers, produits, utilisateurs  where lcs.panierId = paniers.id and lcs.prId = produits.id and paniers.iduser = utilisateurs.id and produits.iduser = ${iduser}`
    )
    .then((data) => {
      console.log('data : ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving panier.',
      })
    })
}
exports.getlr = async (req, res) => {
  const iduser = req.params.id
  const data = await sql
    .query(
      `SELECT lcs.id, lcs.panierId, lcs.etat, lcs.quantite, lcs.type, repas.titre, utilisateurs.id as iduser,utilisateurs.nom, utilisateurs.prenom, utilisateurs.tel from lcs ,paniers, repas, utilisateurs  where lcs.panierId = paniers.id and lcs.prId = repas.id and paniers.iduser = utilisateurs.id and repas.iduser = ${iduser}`
    )
    .then((data) => {
      console.log('data : ', data[0])
      res.send(data[0])
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving panier.',
      })
    })
}

exports.livrer = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  const id = req.params.id
  Lc.update(
    {
      etat: 1,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.send({
        message: `success.`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating panier with id: ' + id,
      })
    })
}

exports.deleteLc = (req, res) => {
  const id = req.params.id
  Lc.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.send({
        message: `success.`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error deleting panier with id: ' + id,
      })
    })
}

//////////////////////
exports.deleteAllLc = (req, res) => {
  const id = req.params.id
  Lc.destroy({
    where: {
      panierId: id,
    },
  })
    .then(() => {
      res.send({
        message: `success.`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error deleting paniers',
      })
    })
}
