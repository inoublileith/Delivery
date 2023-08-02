module.exports = (sequelize, Sequelize) => {
  const Repa = sequelize.define('repa', {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    recette: {
      type: Sequelize.STRING,
    },
    ingrediant: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    prix: {
      type: Sequelize.STRING,
    },
    origine: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.INTEGER,
    },
  })
  return Repa
}
