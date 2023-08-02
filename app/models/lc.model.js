module.exports = (sequelize, Sequelize) => {
  const Lc = sequelize.define('lcs', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantite: {
      type: Sequelize.INTEGER,
    },
    panierId: {
      type: Sequelize.INTEGER,
    },
    prId: {
      type: Sequelize.INTEGER,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.INTEGER,
    },
  })

  return Lc
}
