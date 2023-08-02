module.exports = (sequelize, Sequelize) => {
  const Declaration = sequelize.define('declaration', {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
    iduser: {
      type: Sequelize.INTEGER,
    },
  })
  return Declaration
}
