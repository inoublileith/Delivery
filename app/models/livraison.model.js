module.exports = (sequelize, Sequelize) => {
  const Livraison = sequelize.define('livraison', {
    livreur: {
      type: Sequelize.STRING,
    },
    moyen_transport: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    internationnal: {
      type: Sequelize.STRING,
    },
    date_livraison: {
      type: Sequelize.INTEGER,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
    pourcentage: {
      type: Sequelize.INTEGER,
    },
    angitude: {
      type: Sequelize.STRING,
    },
    attitude: {
      type: Sequelize.INTEGER,
    },
  })
  return Livraison
}
