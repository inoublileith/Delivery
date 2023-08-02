const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user
const { TokenExpiredError } = jwt
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: 'Unauthorized! Access Token was expired!' })
  }
  return res.sendStatus(401).send({ message: 'Unauthorized!' })
}
verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res)
    }
    req.userId = decoded.id
    next()
  })
}
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Require Admin Role!',
      })
      return
    })
  })
}
isAnalyste = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'analyste') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Require Analyste Role!',
      })
    })
  })
}
isPrestataire = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'prestataire') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Require Prestataire Role!',
      })
    })
  })
}
isConsomateur = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'consomateur') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Require Consomateur Role!',
      })
    })
  })
}
isAnalysteOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'analyste') {
          next()
          return
        }
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Require Analyste or Admin Role!',
      })
    })
  })
}
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAnalyste: isAnalyste,
  isPrestataire: isPrestataire,
  isConsomateur: isConsomateur,
  isAnalysteOrAdmin: isAnalysteOrAdmin,
}
module.exports = authJwt
