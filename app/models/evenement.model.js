module.exports = (sequelize, Sequelize) => {
  const Evenement = sequelize.define('evenement', {
    libelle: {
      type: Sequelize.STRING,
    },
    lieu: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },

    prix: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    nombre_de_places: {
      type: Sequelize.INTEGER,
    },
    date_debut: {
      type: Sequelize.STRING,
    },
    date_fin: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.INTEGER,
    },
  })
  return Evenement
}
