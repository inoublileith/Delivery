const config = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.utilisateur = require('./utilisateur.model.js')(sequelize, Sequelize)
db.role = require('./roles.model.js')(sequelize, Sequelize)
db.refreshToken = require('./refreshTocken.model.js')(sequelize, Sequelize)
db.declaration = require('./declaration.model.js')(sequelize, Sequelize)

db.produit = require('./produit.model.js')(sequelize, Sequelize)
db.client = require('./client.model.js')(sequelize, Sequelize)
db.fournisseur = require('./fournisseur.model.js')(sequelize, Sequelize)
db.panier = require('./panier.model.js')(sequelize, Sequelize)
db.admin = require('./admin.model.js')(sequelize, Sequelize)
db.repa = require('./repa.model.js')(sequelize, Sequelize)
db.evenement = require('./evenement.model.js')(sequelize, Sequelize)
db.livraison = require('./livraison.model.js')(sequelize, Sequelize)
db.lc = require('./lc.model.js')(
  sequelize,
  Sequelize
)

db.avis = require('./avis.model.js')(sequelize, Sequelize)

db.participation = require('./participation.model.js')(sequelize, Sequelize)


db.role.belongsToMany(db.utilisateur, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})

db.utilisateur.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.ROLES = ['user', 'admin', 'fournisseurrep', 'fournisseurpro', 'client']
//Sequelize hasOne Join association 1user ------avoir------- 1Token
//db.user.hasOne(db.refreshToken, {
// foreignKey: 'userId',
//targetKey: 'id',

//})
//db.refreshToken.belongsTo(db.user, {
// foreignKey: 'userId',
// targetKey: 'id',
//})
//Sequelize hasMany Join association 1user ------avoir------- *produit

//db.user.hasMany(db.produit, {
// as: 'Product',
//foreignKey: 'iduser'
//})
//db.produit.belongsTo(db.user, { foreignKey: 'iduser' })

module.exports = db

/*
After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

create a new User: create(object)
find a User by id: findByPk(id)
find a User by email: findOne({ where: { email: ... } })
get all Users: findAll()
find all Users by username: findAll({ where: { username: ... } })
*/
